/**
 * @api {get} /users Get
 * @apiName GetUsers
 * @apiGroup Users
 * @apiDescription Get all users
 *
 * @apiSuccess {String[]} roles Users roles
 * @apiSuccess {String} firstName First name
 * @apiSuccess {String} lastName Last name
 * @apiSuccess {String} username Username
 * @apiSuccess {Object} profile Users profile
 * @apiSuccess {DateTime} createdAt Created date
 * @apiSuccess {DateTime} updatedAt Updated date
 * @apiSuccess {String} fullName Full name
 * @apiSuccess {String} id User ID
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *     {
 *         "roles": [
 *             "user"
 *         ],
 *         "firstName": "Peter",
 *         "lastName": "Brooks",
 *         "username": "peter.brooks",
 *         "profile": {
 *             "address": "9413 Elizabeth Dr.Wheaton",
 *             "phone": "(781)2130588",
 *             "id": "5fe05adbd11ad848b80c15a5"
 *         },
 *         "createdAt": "2020-12-21T08:20:44.752Z",
 *         "updatedAt": "2020-12-21T08:20:44.752Z",
 *         "fullName": "Peter Brooks",
 *         "id": "5fe05adbd11ad848b80c15a7"
 *     }
 * ]
 *
 * @apiError UsersNotFound Users not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 *
 */

/**
 * @api {get} /users/paginate Paginate
 * @apiName PaginateUsers
 * @apiGroup Users
 * @apiDescription User paging
 *
 * @apiSuccess {String} username Search by username
 * @apiSuccess {String} firstName Search by first name
 * @apiSuccess {String} lastName Search by last name
 * @apiSuccess {Number} page Page index
 * @apiSuccess {Number} updatedAt Maximum number of records per page
 * @apiSuccess {String} sort Sort field
 * @apiSuccess {String} order asc|desc. Default is ascending
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "docs": [
 *         {
 *             "roles": [
 *                 "user"
 *             ],
 *             "firstName": "Adem",
 *             "lastName": "Reyna",
 *             "username": "adem.reyna",
 *             "profile": {
 *                 "address": "7366 Windfall Sumter, SC 29150",
 *                 "phone": "(282) 578-1873",
 *                 "createdAt": "2020-12-21T08:20:44.694Z",
 *                 "updatedAt": "2020-12-21T08:20:44.694Z",
 *                 "id": "5fe05adbd11ad848b80c15c3"
 *             },
 *             "createdAt": "2020-12-21T08:20:44.754Z",
 *             "updatedAt": "2020-12-21T08:20:44.754Z",
 *             "fullName": "Adem Reyna",
 *             "id": "5fe05adbd11ad848b80c15c5"
 *         }
 *     ],
 *     "total": 21,
 *     "limit": 1,
 *     "page": 1,
 *     "totalPages": 21,
 *     "hasNextPage": true,
 *     "hasPreviousPage": false
 * }
 *
 */

/**
 * @api {get} /users/seed-admin Seed-Admin
 * @apiName SeedAdmin
 * @apiGroup Users
 * @apiDescription API creates a default Admin
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 */

/**
 * @api {get} /users/seed-users Seed-Users
 * @apiName SeedUsers
 * @apiGroup Users
 * @apiDescription API creates some dummy users
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *
 */
