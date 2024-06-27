const User = require('../models/user');
const Visit = require('../models/visit');
const Post = require('../models/post');
const Like = require('../models/like');

let visitStats = [];
let usersData = [];
let visitData = {};
let similarityScoresList = {};
let chapterPostsData = [];
let likesData = []
const K = 5;

exports.getUsers = async () => {
    return await User.find({}, { _id: 1 })
}

exports.getVisits = async () => {
    visitStats = await Visit.find();
    return visitStats;
}

exports.getChapterPosts = async () => {
    return await Post.find({ Type: 'CS' });
}

exports.getLikes = async () => {
    return await Like.find();
}

exports.KNN = async (users, visits, chapterPosts, likes, id) => {
    const Visits = {};
    const Likes = {};
    for (let i = 0; i < visits.length; i++) {
        Visits[visits[i].VisitorId] = { ...Visits[visits[i].VisitorId], [visits[i].OwnerId]: visits[i].Count }
    }
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < likes.length; j++) {
            if (users[i]._id.toString() === likes[j].UserId.toString()){
                Likes[users[i]._id] = {...Likes[likes[j].UserId], [likes[j].PostId]:true }
            }
        }

    }
    usersData = users;
    visitData = Visits;
    chapterPostsData = chapterPosts;
    likesData = Likes;
    const neighbours = await nearestneighbours(id);
    return neighbours;
}

const nearestneighbours = async (id) => {
    let similarityScores = {};
    for (let i = 0; i < usersData.length; i++) {
        if (usersData[i]._id.toString() !== id.toString()) {
            const similarity = await euclideanDistance(id, usersData[i]._id);
            similarityScores[usersData[i]._id] = await similarity;
        } else {
            similarityScores[id] = -1;
        }
    }
    for (let i = 0; i < Object.entries(similarityScores).length; i++) {
        if (similarityScores[usersData[i]._id] !== undefined && similarityScores[usersData[i]._id] > 0) {
            similarityScoresList[usersData[i]._id] = similarityScores[usersData[i]._id]
        }
    }
    let users = Object.keys(similarityScoresList);
    users.sort((a, b) => {
        let score1 = similarityScoresList[a];
        let score2 = similarityScoresList[b];
        return score2 - score1;
    })
    let KNN = []
    for (let i = 0; i < K; i++) {
        if (i < users.length) {
            KNN.push(users[i])
        }
    }

    return KNN;
}

const euclideanDistance = async (myId, userId) => {
    const myVisits = visitData[myId];
    const userVisits = visitData[userId];
    if (myVisits !== undefined && userVisits !== undefined) {
        let sumSquares = null;
        let distance;
        let similarty = 0;
        for (let i = 0; i < usersData.length; i++) {
            const visits1 = myVisits[usersData[i]._id];
            const visits2 = userVisits[usersData[i]._id];
            if (visits1 !== undefined && visits2 !== undefined) {
                const diff = visits2 - visits1;
                sumSquares += diff * diff;
            }
        }
        if (sumSquares !== null) {
            distance = Math.sqrt(sumSquares);
            similarty = 1 / (1 + distance);
        }
        return similarty;
    }

}

exports.getPredictions = async (neighbours, id) => {

    let predictions = {}
    const myVisits = Object.keys(visitData[id])
    for (let i = 0; i < usersData.length; i++) {
        let weightedSum = 0;
        let similaritySum = 0;
        if (usersData[i]._id.toString() !== id.toString()) {
            if (!myVisits.includes(usersData[i]._id.toString())) {
                if (!neighbours.includes(usersData[i]._id.toString())) {
                    for (let j = 0; j < neighbours.length; j++) {
                        if (j < neighbours.length) {
                            const neighbourVisits = visitData[neighbours[j]];
                            const visit = neighbourVisits[usersData[i]._id];
                            if (visit !== undefined) {
                                const similarity = similarityScoresList[neighbours[j]];
                                weightedSum += visit * similarity;
                                similaritySum += similarity;
                            }
                        }
                    }
                    if (weightedSum !== 0) {
                        const prediction = weightedSum / similaritySum;
                        predictions[usersData[i]._id] = prediction;
                    }
                }
            }
        }
    }

    let users = Object.keys(predictions);
    users.sort((a, b) => {
        const prediction1 = predictions[a];
        const prediction2 = predictions[b];
        return prediction2 - prediction1;
    })
    let finalUsers = [];
    for (let i = 0; i < K; i++) {
        if (i < users.length) {
            finalUsers.push(users[i])
        }
    }
    return finalUsers;
}

exports.getPredictionsForChapters = async (neighbours, id) => {

    let predictions = {}
    const myLikes = Object.keys(likesData[id])
    for (let i = 0; i < chapterPostsData.length; i++) {
        let weightedSum = 0;
        let similaritySum = 0;
        if (chapterPostsData[i].UserId.toString() !== id.toString()) {
            if (!myLikes.includes(chapterPostsData[i]._id.toString())) {
                if (!neighbours.includes(chapterPostsData[i].UserId.toString())) {
                    for (let j = 0; j < neighbours.length; j++) {
                        if (j < neighbours.length) {
                            const neighbourLikes = likesData[neighbours[j]];
                            if(neighbourLikes!==undefined){
                               const like =  neighbourLikes[chapterPostsData[i]._id];
                                if (like!==undefined) {
                                    const similarity = similarityScoresList[neighbours[j]];
                                    weightedSum += 5 * similarity;
                                    similaritySum += similarity;
                                }
                            }
                        }
                    }
                    if (weightedSum !== 0) {
                        const prediction = weightedSum / similaritySum;
                        predictions[chapterPostsData[i]._id] = prediction;
                    }
                }
            }
        }
   }

    let chapters = Object.keys(predictions);
    chapters.sort((a, b) => {
        const prediction1 = predictions[a];
        const prediction2 = predictions[b];
        return prediction2 - prediction1;
    })
    let finalChapters = [];
    for (let i = 0; i < K; i++) {
        if (i < chapters.length) {
            finalChapters.push(chapters[i])
        }
    }
    return finalChapters;
}






