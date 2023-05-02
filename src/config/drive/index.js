const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
require("dotenv").config();
const stream = require('stream');

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
/**
 * Create an OAuth2 client with the given credentials, and then execute the given callback function.
*/
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

var root = '/Users/admin/Documents/roinuoc_backend/src/';

const drive = google.drive({
    version: 'v3',
    auth: oAuth2Client,
})


async function setFilePermisstion(fileId) {
    try {
        await drive.permissions.create({
            fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            }
        })

        const getUrl = await drive.files.get({
            fileId, 
            fields: [ 'webContentLink']
        });

        return getUrl
    } catch (error) {
        console.log(error);
    }
}

async function uploadFile(file) {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file[0].buffer);
    const fileMetadata = {
        'name': file.originalName,
        parents: ['1ea8NNv6JEdB2zXZkTMy3Pg045sqltffe']
    };
    const media = {
        mimeType: 'image/jpeg',
        body: bufferStream
    };
    const { data } = await google.drive({
        version: 'v3',
        auth: oAuth2Client,
    }).files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    });

    console.log(data, 'fdasf');
    const url = await setFilePermisstion(data.id);
    console.log('sucess')
    return url.data.webContentLink
}

module.exports = {uploadFile}