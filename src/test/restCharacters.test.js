const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const { expect } = chai;

chai.use(chaiHttp);

const request = async (args = '') =>
  chai.request(server).get(`/characters/${args}`);

describe('[REST] Get all characters', () => {
  it('should return 200 and an array of characters', async () => {
    const res = await request();

    expect(res).to.have.status(200);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('array');
  });

  it('should return the amount of items specified in the page size', async () => {
    const res = await request('?pageSize=10');
    expect(res.body.data.length).to.equal(10);
  });

  it('should return the correct previous and next page url', async () => {
    const res = await request('?page=2');
    const prevPage = res.body.previousPage;
    const nextPage = res.body.nextPage;

    expect(prevPage).to.include('?page=1');
    expect(nextPage).to.include('?page=3');
  });

  it('the characters array should have the same length of the count', async () => {
    const res = await request();
    expect(res.body.data.length).to.equal(res.body.count);
  });

  it('the characters array should have the correct properties', async () => {
    const res = await request();
    const character = res.body.data[0];

    expect(character).to.have.property('_id');
    expect(character).to.have.property('name');
    expect(character).to.have.property('imageUrl');
    expect(character).to.have.property('url');
    expect(character).to.have.property('films');
    expect(character).to.have.property('shortFilms');
    expect(character).to.have.property('tvShows');
    expect(character).to.have.property('videoGames');
    expect(character).to.have.property('parkAttractions');
    expect(character).to.have.property('allies');
    expect(character).to.have.property('enemies');
  });
});
