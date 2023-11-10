const axios = require("axios");
const { GraphQLError } = require("graphql");
const Redis = require("ioredis");
const redis = new Redis("redis://default:Sirua4yS6GzFm2VIsx08fMCxak4LtmfA@redis-16177.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:16177");

const job_url = "http://localhost:4002/jobs/";
const user_url = "http://localhost:4001/users/";

const appTypeDefs = `#graphql
  type Job {
    id: ID
    title: String,
    description: String,
    companyId: Int,
    authorId: String,
    jobType: String,
    createdAt: String,
    updatedAt: String,
    Skills: [Skill],
    Company: Company,
    User: User
  }

  type Skill {
    id: ID,
    name: String,
    level: String,
    jobId: Int,
    createdAt: String,
    updatedAt: String
  }

  type Company {
    id: ID
    name: String,
    companyLogo: String,
    location: String,
    email: String,
    description: String,
    createdAt: String,
    updatedAt: String
  }

  type User {
    _id: ID
    username: String,
    email: String,
    password: String,
    role: String,
    phoneNumber: String
    address: String,
    createdAt: String,
    updatedAt: String
  }

  type Message {
    message: String
  }

  type Query {
    jobs: [Job],
    job(id: ID!): Job
  }

  input SkillInput {
    id: ID
    name: String,
    level: String
  }

  input JobInput {
    title: String,
    description: String,
    companyId: Int,
    authorId: String,
    jobType: String,
    Skills: [SkillInput]
  }

  type Mutation {
    createJob(content: JobInput): Message,
    updateJob(content: JobInput, id: ID!): Message,
    deleteJob(id: ID!): Message
  }
`;

const appResolvers = {
  Query: {
    jobs: async () => {
      try {
        const jobsCache = await redis.get("jobs");

        if (jobsCache) {
          const result = JSON.parse(jobsCache);
          return result;
        } else {
          const { data } = await axios.get(job_url);

          const dataToCache = JSON.stringify(data);
          redis.set("jobs", dataToCache);
          return data;
        }
      } catch (err) {
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    job: async (_, { id }) => {
      try {
        const { data: job } = await axios.get(job_url + id);
        const { data: user } = await axios.get(user_url + job.authorId);

        job.User = user;
        return job;
      } catch (err) {
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
  },
  Mutation: {
    createJob: async (_, { content }) => {
      try {
        const { data } = await axios({
          method: "post",
          url: job_url,
          data: content,
        });

        await redis.del("jobs");
        return data;
      } catch (err) {
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    updateJob: async (_, { content, id }) => {
      try {
        const { data } = await axios({
          method: "put",
          url: job_url + id,
          data: content,
        });

        await redis.del("jobs");
        return data;
      } catch (err) {
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
    deleteJob: async (_, { id }) => {
      try {
        const { data } = await axios.delete(job_url + id);

        await redis.del("jobs");
        return data;
      } catch (err) {
        throw new GraphQLError(err.response.data.message, {
          extensions: { code: err.response.status, http: { status: err.response.status } },
        });
      }
    },
  },
};

module.exports = { appTypeDefs, appResolvers };
