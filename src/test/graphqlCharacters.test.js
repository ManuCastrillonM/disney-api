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

const characterByNameQuery = (name) => {
  return `{
    characterByName(name: "${name}") {
      _id
      name
    }
  }`;
};

const characterQuery = (_id) => {
  return `{
    character(_id: ${_id}) {
      _id
      name
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

  it('sould return 50 characters if no page size is specified', async () => {
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

describe('[GRAPHQL] Get characters by name', () => {
  it('should return 200 and a character', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({
        query: characterByNameQuery('Mickey Mouse')
      })
      .expect(200);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('object');
    expect(res.body.data).to.have.property('characterByName');
    expect(res.body.data.characterByName).to.be.an('object');
    expect(res.body.data.characterByName).to.have.property('_id');
    expect(res.body.data.characterByName).to.have.property('name');
  });

  it('should return 200 and a character with the correct name', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({
        query: characterByNameQuery('Mickey Mouse')
      })
      .expect(200);

    expect(res.body.data.characterByName.name).to.equal('Mickey Mouse');
  });
});

describe('[GRAPHQL] Get character by id', () => {
  it('should return 200 and a character', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({
        query: characterQuery(30)
      })
      .expect(200);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('object');
    expect(res.body.data).to.have.property('character');
    expect(res.body.data.character).to.be.an('object');
    expect(res.body.data.character).to.have.property('_id');
    expect(res.body.data.character).to.have.property('name');
  });

  it('should return 200 and a character with the correct id', async () => {
    const res = await request(server)
      .post('/graphql')
      .send({
        query: characterQuery(30)
      })
      .expect(200);

    expect(res.body.data.character._id).to.equal(30);
  });
});
