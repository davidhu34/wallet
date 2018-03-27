import { gapiReady } from '../actions'
import { CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from '../configs'

class GAPI {
    constructor (store) {

        let loadingGAPI
        const donePrepare = (gapi) => {
            clearInterval(loadingGAPI)
            store.dispatch({ type: 'GAPI_READY', gapi: gapi })

            console.log('window gapi loaded')
            this.gapi.load('client:auth2', () => {
                console.log('window gapi.load done')
                this.gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES
                }).then( () => {
                    console.log('gapi client inited')
                    // this.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
                    this.gapi.auth2.getAuthInstance().signIn()
                });
            })
        }
        const getWindowGAPI = () => {
            console.log('window gapi listen')
            if (window.gapi) {
                this.gapi = window.gapi
                donePrepare(this)
            }
        }
        loadingGAPI = setInterval(getWindowGAPI, 1000)


    }


    gapiList (name) {
        return new Promise( (resolve, reject) => {

            let pageToken = null
            this.gapi.client.drive.files.list({
                q: 'mimeType=\'text\/csv\' and name=\''+name+'\'',
                fields: 'nextPageToken, files(id, name)',
                spaces: 'drive',
                pageToken: pageToken
            }).then( response => {
                console.log(response)
                // const { files, pageToken } = response.result
                const result = response.result
                resolve(result)
            })

        })
    }

    gapiGet (id) {
        return new Promise( (resolve ,reject) => {

            this.gapi.client.drive.files.get({
                fileId: id,
                alt: 'media'
            }).then( response => {
                console.log(response)
                const result = response.result
                resolve(result)
            })

        })
    }

    gapiUpdate () {
        return gapiUpload(file, true)
    }
    gapiCreate (file) {
        return gapiUpload(file, false)
    }
    gapiUpload (file, exist) {
        return new Promise( (resolve, reject) => {

            const { id, name, data } = file

            const boundary = '-------314159265358979323846';
            const delimiter = "\r\n--" + boundary + "\r\n";
            const close_delim = "\r\n--" + boundary + "--";

            const fileContent = '6,7,8\n1,2,3\n5,6,7';// data

            const metadata = {
                'name': 'csvreq.csv',
                'mimeType': 'text/csv\r\n\r\n'
            }

            const multipartRequestBody = delimiter
                + 'Content-Type: application/json\r\n\r\n'
                + JSON.stringify(metadata)
                + delimiter
                + 'Content-Type: ' + 'text/csv\r\n\r\n'
                + fileContent
                + close_delim

            const params = {
                'path': '/upload/drive/v3/files/'+exist? id: '',
                'method': exist? 'PATCH': 'POST',
                'params': {
                    'uploadType': 'multipart'
                },
                'headers': {
                    'Content-Type': 'multipart/related; boundary="' + boundary + '"'
                },
                'body': multipartRequestBody
            }

            this.gapi.client.request(params)
            .then( response => {
                const result = response.result
                console.log(result)
                resolve(response)
            })
        })
    }
}
export default GAPI
