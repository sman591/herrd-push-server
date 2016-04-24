var request = require('supertest');
describe('loading express', function () {
  var server = require('./app');

  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

  var authTestPathsGet = [
    '/apps',
    '/apps/new',
    '/apps/1',
    '/apps/1/destroy',
    '/apps/1/regenerate'
  ];
  var authTestPathsPost = [
    '/apps'
  ];

  authTestPathsGet.forEach(function(path) {
    it('requires authentication for GET ' + path, function testPath(done) {
      request(server)
        .get(path)
        .expect(302, done);
    });
  });
  authTestPathsPost.forEach(function(path) {
    it('requires authentication for POST ' + path, function testPath(done) {
      request(server)
        .get(path)
        .expect(302, done);
    });
  });

  it('allows access to initial user sign up page', function testPath(done) {
    request(server)
      .get('/auth/signup')
      .expect(200, done);
  });
  it('allows initial user sign up', function testPath(done) {
    request(server)
      .post('/auth/signup')
      .send({ username: 'username', password: 'password' })
      .expect(302)
      .expect('Location', '/apps')
      .end(done);
  });
  it('requires authentication for future user sign up page access', function testPath(done) {
    request(server)
      .get('/auth/signup')
      .expect(302, done);
  });
  it('requires authentication for future user sign ups', function testPath(done) {
    request(server)
      .post('/auth/signup')
      .expect(302, done);
  });
});
