const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Create an issue with every field: POST request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .post('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('Create an issue with only required fields: POST request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .post('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('Create an issue with missing required fields: POST request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .post('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('View issues on a project: GET request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .get('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('View issues on a project with one filter: GET request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .get('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('View issues on a project with multiple filters: GET request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .get('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('Update one field on an issue: PUT request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .put('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('Update multiple fields on an issue: PUT request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .put('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('Update an issue with missing _id: PUT request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .put('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('Update an issue with no fields to update: PUT request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .put('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .put('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('Delete an issue: DELETE request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .delete('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .delete('/api/issues/testing')
            .end(function (err, res) {

            });
    });
    test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', function(done){
        chai
            .request(server)
            .delete('/api/issues/testing')
            .end(function (err, res) {

            });
    });  
});
