const { expect } = require('chai');
const request = require('supertest');
const server = require('../server.js');

const charactersQuery = (filter = {}, page = 1, pageSize = 50) => {
  return `{
    characters(filter: ${filter}, page: ${page}, pageSize: ${pageSize}) {
      items {
        _id
        name
      }
      paginationInfo {
        hasPreviousPage
        hasNextPage
        pageItemCount
        totalPages
      }
    }`;
};

describe.skip('[GRAPHQL] Get characters', () => {
  it('should return 200 and an array of characters', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({ query: charactersQuery() })
      .expect(200);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('object');
    expect(res.body.data).to.have.property('characters');
    expect(res.body.data.characters).to.be.an('object');
    expect(res.body.data.characters).to.have.property('items');
    expect(res.body.data.characters.items).to.be.an('array');
  });

  it('sould return 50 characters if no page size is specified', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({ query: charactersQuery() })
      .expect(200);

    expect(res.body.data.characters.items.length).to.equal(50);
  });

  it('should return the same number of characters as the page size', async () => {});
});
