process.env.PORT = process.env.PORT || 4000 // Port express

process.env.EXPTOKEN = "3d" // Time live valid tokens 3 days
process.env.SEED = process.env.SEED || 'No, I am your father' // Seed SECRET encrypt token

// Configuration MongoDB
process.env.DBNAME = process.env.DBNAME || 'gql?retryWrites=true&w=majority'
process.env.DBHOST = process.env.DBHOST || '@cluster0-zx8mm.mongodb.net'
process.env.DBUSER = process.env.DBUSER || 'eac';
process.env.DBPASS = process.env.DBPASS || 'rootadm1n'
process.env.DBPORT = process.env.DBPORT || 27017

// For development
process.env.URI = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}${process.env.DBHOST}/${process.env.DBNAME}`

// 'mongodb+srv://eac:rootadm1n@cluster0-zx8mm.mongodb.net/eacdb?retryWrites=true&w=majority'

// For production
// process.env.URI = `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`;