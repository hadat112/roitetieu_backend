var vntk = require("vntk");
var tokenizer = vntk.wordTokenizer();

// Tokenize a document into an array of words
function tokenize(document) {
    return tokenizer.tag(document);
}

// Calculate the term frequency (TF) of a term in a document
function calculateTF(term, document) {
    const tokens = tokenize(document);
    const count = tokens.filter((token) => token === term).length;
    return count / tokens.length;
}

// Calculate the inverse document frequency (IDF) of a term in a collection of documents
function calculateIDF(term, documents) {
    const count = documents.filter((document) =>
        tokenize(document.title).includes(term)
    ).length;
    return Math.log(documents.length / count);
}

// Calculate the TF-IDF weight of a term in a document
function calculateTFIDF(term, document, documents) {
    return calculateTF(term, document) * calculateIDF(term, documents);
}

// Calculate the cosine similarity between two documents
function calculateCosineSimilarity(document1, document2, documents) {
    const tokens1 = tokenize(document1.title);
    const tokens2 = tokenize(document2.title);
    const uniqueTokens = new Set([...tokens1, ...tokens2]);
    const vector1 = [];
    const vector2 = [];
    for (const token of uniqueTokens) {
        vector1.push(calculateTFIDF(token, document1.title, documents));
        vector2.push(calculateTFIDF(token, document2.title, documents));
    }
    let dotProduct = 0;
    for (let i = 0; i < vector1.length; i++) {
        dotProduct += vector1[i] * vector2[i];
    }
    const magnitude1 = Math.sqrt(vector1.reduce((sum, x) => sum + x * x, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((sum, x) => sum + x * x, 0));
    return dotProduct / (magnitude1 * magnitude2);
}

// Generate a matrix of similarity scores for all pairs of documents
function generateSimilarityMatrix(documents) {
    const similarityMatrix = [];
    for (let i = 0; i < documents.length; i++) {
        similarityMatrix[i] = [];
        for (let j = 0; j < documents.length; j++) {
            similarityMatrix[i][j] = calculateCosineSimilarity(
                documents[i],
                documents[j],
                documents
            );
        }
    }
    return similarityMatrix;
}

var matrix;

const getMatrix = (documents) => {
    matrix = generateSimilarityMatrix(documents);
}


// Get the top n recommendations for a given document
function getTopRecommendations(index, documents, n) {
    if(!matrix) getMatrix(documents);
    console.log({ matrix });
    const similarityScores = matrix[index];
    console.log({ similarityScores });
    const sortedIndices = similarityScores
        .map((score, index) => [score, index])
        .sort(([score1], [score2]) => score2 - score1)
        .map(([_, index]) => index);
    return sortedIndices.slice(1, n + 1).map((index) => documents[index]);
}

module.exports = {
    getTopRecommendations,
};