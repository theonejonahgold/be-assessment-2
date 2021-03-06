/* eslint-disable new-cap */
const router = require('express').Router()
const account = require('../utils/accountUtil')

/**
 * Renders homepage
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const homePage = async (req, res, next) => {
    if (account.currentUser.isLoggedIn(req)) {
        try {
            const loggedInUser = await account.currentUser.get(req)
            const fetchedUsers = await account.find.all()
            const processedUsers = await account.process.list(loggedInUser, fetchedUsers)
            res.render('home/home', {
                data: processedUsers[0],
                match: null
            })
        } catch (err) {
            next({ err, status: 500 })
        }
    } else {
        res.redirect('/account/login')
    }
}

/**
 * Renders homepage with match
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const homePageWithMatch = async (req, res, next) => {
    if (account.currentUser.isLoggedIn(req)) {
        try {
            const { id } = req.params
            const loggedInUser = await account.currentUser.get(req)
            const match = await account.find.id(id)
            res.render('home/home', {
                match: {
                    userOne: loggedInUser,
                    userTwo: match
                },
                data: null
            })
        } catch (err) {
            next({ err, status: 422 })
        }
    } else {
        res.redirect('/account/login')
    }
}

/**
 * Likes a user, and creates if match if idem
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const likeUser = async (req, res, next) => {
    if (account.currentUser.isLoggedIn(req)) {
        const { id } = req.params
        try {
            const loggedInUser = await account.currentUser.get(req)
            loggedInUser.likes.push(id)
            await loggedInUser.update(loggedInUser)
            if (await account.checkMatch(loggedInUser, id)) {
                account.process.match(loggedInUser, id)
                res.redirect(`/home/match/${id}`)
            } else {
                res.redirect('/home')
            }
        } catch (err) {
            next({ err, status: 422 })
        }
    } else {
        res.redirect('/account/login')
    }
}

/**
 * Dislikes a user, adding its ID to the Account documetn
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
const dislikeUser = async (req, res, next) => {
    if (account.currentUser.isLoggedIn(req)) {
        const { id } = req.params
        try {
            const loggedInUser = await account.currentUser.get(req)
            loggedInUser.dislikes.push(id)
            await loggedInUser.update(loggedInUser)
            res.redirect('/home')
        } catch (err) {
            next({ err, status: 422 })
        }
    } else {
        res.redirect('/home')
    }
}

module.exports = router
    .get('/', homePage)
    .post('/like/:id', likeUser)
    .post('/dislike/:id', dislikeUser)
    .get('/match/:id', homePageWithMatch)
