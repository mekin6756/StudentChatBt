import '@tensorflow/tfjs-backend-cpu';
export declare function initializeModel(): Promise<void>;
export declare function getSentenceSimilarity(sentence1: string, sentence2: string): Promise<number>;
