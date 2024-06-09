import * as use from "@tensorflow-models/universal-sentence-encoder";
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-cpu';

let model: use.UniversalSentenceEncoder = null;

export async function initializeModel() {
    if (model === null) model = await use.load();
}

export async function getSentenceSimilarity(sentence1: string, sentence2: string) {
    // uses Universal Sentence Encoder (U.S.E.):
    if (model === null) model = await use.load();
    return await embedSentences(sentence1, sentence2);
}

async function embedSentences(sentence1: string, sentence2: string) {
    const sentences = [sentence1, sentence2];
    let embeddings = await model.embed(sentences);

    const embeds = embeddings.arraySync();
    const sentence1Embedding = embeds[0];
    const sentence2Embedding = embeds[1];
    let similarity = getSimilarityPercent(sentence1Embedding, sentence2Embedding);
    return similarity;
}

function getSimilarityPercent(embed1: number[], embed2: number[]) {
    const similarity = cosineSimilarity(embed1, embed2);
    // cosine similarity -> % when doing text comparison, since cannot have -ve term frequencies: https://en.wikipedia.org/wiki/Cosine_similarity
    return similarity;
}

function cosineSimilarity(a: number[], b: number[]) {
    // https://towardsdatascience.com/how-to-build-a-textual-similarity-analysis-web-app-aa3139d4fb71

    const magnitudeA = Math.sqrt(dotProduct(a, a));
    const magnitudeB = Math.sqrt(dotProduct(b, b));
    if (magnitudeA && magnitudeB) {
        // https://towardsdatascience.com/how-to-measure-distances-in-machine-learning-13a396aa34ce
        return dotProduct(a, b) / (magnitudeA * magnitudeB);
    } else {
        return 0;
    }
}

function dotProduct(a: number[], b: number[]) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += a[i] * b[i];
    }
    return sum;
}

// -------------------------------------------------

// function useModelToEmbedAllSentences(sentences, callback) {
//   require("@tensorflow/tfjs-node");
//   const use = require("@tensorflow-models/universal-sentence-encoder");
//   const fs = require("fs");
//   // uses Universal Sentence Encoder (U.S.E.):
//   use.load().then((model) => {
//     embedAllSentences(model, sentences, fs);
//   });
// }

// function embedAllSentences(model, sentences, fs) {
//   model.embed(sentences).then((embeddings) => {
//     const embeds = embeddings.arraySync();
//     if (fs) {
//       for (let i = 0; i < embeds.length; i++) {
//         const sentence = sentences[i];
//         const embed = embeds[i];
//         const addNewLine = i === 0 ? "" : "\n";
//         fs.appendFile("words.txt", addNewLine + sentence, function (err) {
//           if (err) throw err;
//           console.log(`Added word ${i}!`);
//         });
//         fs.appendFile("embeddings.txt", addNewLine + embed, function (err) {
//           if (err) throw err;
//           console.log(`Added embedding ${i}!`);
//         });
//       }
//       console.log("Done adding all words and embeddings (mapped by index).");
//     }
//   });
// }
