const { GraphQLServer } = require('graphql-yoga')

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
  {
    id: "link-1",
    url: "www.prisma.io",
    description: "Prisma replaces tradicional ORMs",
  }
]

let idCount = links.length

const resolvers = {
  Query: {
    info: () => `api`,
    feed: () => links,
    
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },

    updateLink: (parent,args) => {
      const { id, url, description } = args

      const link = links.filter(item => {
        
        if(id !== item.id){
          return
        }
        return item

      })

      if(link.length === 0){
        link.push({
          id: `${id} not found`,
          url: `${url}`,
          description: `update failed`,
        })
        return link[0]
      }
      link[0].url = url
      link[0].description = description
      return link[0]
    }
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`server up!`))
