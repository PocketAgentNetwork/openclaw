import parser from './src/parser.js';
const { parse } = parser;

const codeStr = `
Type Boolean
Type Int
Type Float
Type String
Type Date
Type Uuid
Type Json

Type PageInfo {
    Int count
    Boolean hasNextPage
    Boolean hasPreviousPage
}

Type Connection Of(T) {
    PageInfo pageInfo
    [T] edges
}

Type Edge Of(T) {
    String cursor
    T node
}

Type GenericWithExtends Of(T extends Node, Y) {
    T myNode
    Y otherNode
}

Type MyType {
    String name
    Int age
}
`;

try {
    const parsed = parse({ fileText: codeStr });

    if (!parsed['Edge']) {
        throw new Error("Test failed: missing Edge");
    }
    if (!parsed['GenericWithExtends']) {
        throw new Error("Test failed: missing GenericWithExtends");
    }

    const connectionEdges = parsed['Connection'].props.find(p => p.type === '[T]' && p.name === 'edges');
    if (!connectionEdges) {
        throw new Error("Test failed: Connection missing [T] edges property");
    }

    if (!parsed['Edge'].generics || parsed['Edge'].generics[0] !== 'T') {
        throw new Error("Test failed: Edge missing generic T");
    }

    const parsedGraphql = parse({ fileText: codeStr, typeFormat: 'GraphQL' });

    if (!parsedGraphql['Edge'] || parsedGraphql['Edge'].generics) {
        throw new Error("Test failed: GraphQL Edge should not have generics");
    }
    const graphqlConnectionEdges = parsedGraphql['Connection'].props.find(p => p.type === '[Edge]' && p.name === 'edges');
    if (!graphqlConnectionEdges) {
        throw new Error("Test failed: Connection in GraphQL missing [Edge] edges property");
    }

    console.log("All tests passed!");
    process.exit(0);

} catch(e) {
    console.error(e.message);
    process.exit(1);
}
