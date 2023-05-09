const { expect } = require('chai');
const request = require('supertest');
const server = require('../server.js');

const charactersQuery = (props) => {
  const { page, pageSize, filter } = props || {};

  return `{
    characters${page ? `(page: ${page})` : ''}${
    pageSize ? `(pageSize: ${pageSize})` : ''
  }${filter ? `(filter: ${filter})` : ''} {
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
    }
  }`;
};

describe('[GRAPHQL] Get characters', () => {
  it('should return 200 and an array of characters', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({
        query: charactersQuery()
      })
      .expect(200);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('object');
    expect(res.body.data).to.have.property('characters');
    expect(res.body.data.characters).to.be.an('object');
    expect(res.body.data.characters).to.have.property('items');
    expect(res.body.data.characters.items).to.be.an('array');
  });

  it('should return 50 characters if no page size is specified', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({ query: charactersQuery() })
      .expect(200);

    expect(res.body.data.characters.items.length).to.equal(50);
  });

  it('should return the same number of characters as the page size', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({ query: charactersQuery({ pageSize: 10 }) })
      .expect(200);

    expect(res.body.data.characters.items.length).to.equal(10);
  });
});

describe('[GRAPHQL] Get characters with filter', () => {
  it('should return 200 and an array of characters', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({
        query: charactersQuery({
          filter: '{name: "Mickey Mouse"}'
        })
      })
      .expect(200);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('object');
    expect(res.body.data).to.have.property('characters');
    expect(res.body.data.characters).to.be.an('object');
    expect(res.body.data.characters).to.have.property('items');
    expect(res.body.data.characters.items).to.be.an('array');
  });

  it('should return a character with the name "Mickey Mouse"', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({
        query: charactersQuery({
          filter: '{name: "Mickey Mouse"}'
        })
      })
      .expect(200);

    expect(res.body.data.characters.items[0].name).to.contain('Mickey Mouse');
  });
});
