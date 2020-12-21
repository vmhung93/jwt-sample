const userService = require("../services/user.service");

const { Role } = require("../constants/role");

const pagingHelper = require("../helpers/paging.helper");

/**
 * Seed admin
 */
const seedAdmin = async (req, res, next) => {
  try {
    const admin = await userService.findOne({ username: "admin" });

    if (admin) {
      return res.sendStatus(400).end();
    }

    await userService.create({
      firstName: "Admin",
      lastName: "Admin",
      username: "admin",
      password: "admin",
      roles: Role.Admin,
      address: "38 Wild Rose St.Windsor",
      phone: "(04)35142986",
    });

    return res.sendStatus(200).end();
  } catch (e) {
    next(e);
  }
};

/**
 * Seed users
 */
const seedUsers = async (req, res, next) => {
  try {
    await userservice.createmany([
      {
        firstname: "peter",
        lastname: "brooks",
        username: "peter.brooks",
        password: "123x@x",
        roles: role.user,
        address: "9413 elizabeth dr.wheaton",
        phone: "(781)2130588",
      },
      {
        firstname: "louis",
        lastname: "russell",
        username: "louis.russell",
        password: "123x@x",
        roles: role.user,
        address: "81 wild horse lane glenside",
        phone: "(344)6461486",
      },
      {
        firstname: "reis",
        lastname: "kennedy",
        username: "reis.kennedy",
        password: "123x@x",
        roles: role.user,
        address: "365 wood herndon, va 20170",
        phone: "(688) 527-2187",
      },
      {
        firstname: "alexis",
        lastname: "lewis",
        username: "alexis.lewis",
        password: "123x@x",
        roles: role.user,
        address: "209 walt whitman court lakewood, nj 08701",
        phone: "(229) 339-4844",
      },
      {
        firstname: "zayne",
        lastname: "baldwin",
        username: "zayne.baldwin",
        password: "123x@x",
        roles: role.user,
        address: "52 clark street west bloomfield, mi 48322",
        phone: "(711) 241-6379",
      },
      {
        firstname: "emaan",
        lastname: "fisher",
        username: "emaan.fisher",
        password: "123x@x",
        roles: role.user,
        address: "87 arnold ave, jamaica plain, ma 02130",
        phone: "(951) 928-1663",
      },
      {
        firstname: "dolly",
        lastname: "copeland",
        username: "dolly.copeland",
        password: "123x@x",
        roles: role.user,
        address: "58 grandrose road huntsville, al 35803",
        phone: "(242) 342-1005",
      },
      {
        firstname: "kierran",
        lastname: "jackson",
        username: "kierran.jackson",
        password: "123x@x",
        roles: role.user,
        address: "497 albany o_rdonly, gloucester, ma 01930",
        phone: "(215) 593-5237",
      },
      {
        firstname: "ayoub",
        lastname: "mann",
        username: "ayoub.mann",
        password: "123x@x",
        roles: role.user,
        address: "318 north san carlos st. buffalo grove, il 60089",
        phone: "(480) 373-8533",
      },
      {
        firstname: "lawrence",
        lastname: "keith",
        username: "lawrence.keith",
        password: "123x@x",
        roles: role.user,
        address: "9237 bohemia woodhaven, ny 11421",
        phone: "(472) 691-8402",
      },
      {
        firstname: "adem",
        lastname: "reyna",
        username: "adem.reyna",
        password: "123x@x",
        roles: role.user,
        address: "7366 windfall sumter, sc 29150",
        phone: "(282) 578-1873",
      },
      {
        firstname: "delia",
        lastname: "thatcher",
        username: "delia.thatcher",
        password: "123x@x",
        roles: role.user,
        address: "7761 maiden township, nj 08234",
        phone: "(760) 273-0360",
      },
      {
        firstname: "roxie",
        lastname: "hardin",
        username: "roxie.hardin",
        password: "123x@x",
        roles: role.user,
        address: "7553 andover street, ga 30534",
        phone: "(902) 461-5267",
      },
      {
        firstname: "madison",
        lastname: "wise",
        username: "madison.wise",
        password: "123x@x",
        roles: role.user,
        address: "5 princess champaign, il 61821",
        phone: "(667) 663-9499",
      },
      {
        firstname: "tilly",
        lastname: "griffin",
        username: "tilly.griffin",
        password: "123x@x",
        roles: role.user,
        address: "121 leeton fremont, oh 43420",
        phone: "(646) 352-2240",
      },
      {
        firstname: "maxine",
        lastname: "mullen",
        username: "maxine.mullen",
        password: "123x@x",
        roles: role.user,
        address: "200 gainsway, kingston, ny 12401",
        phone: "(945) 838-9628",
      },
      {
        firstname: "mylee",
        lastname: "sweet",
        username: "mylee.sweet",
        password: "123x@x",
        roles: role.user,
        address: "676 river ave, lauderdale, fl 33308",
        phone: "(775) 381-9905",
      },
      {
        firstname: "haidar",
        lastname: "mayo",
        username: "haidar.mayo",
        password: "123x@x",
        roles: role.user,
        address: "8259 orange, manassas, va 20109",
        phone: "(741) 595-1319",
      },
      {
        firstname: "macy",
        lastname: "davidson",
        username: "macy.davidson",
        password: "123x@x",
        roles: role.user,
        address: "42 edgewood, streetmatawan, nj 07747",
        phone: "(333) 776-0486",
      },
      {
        firstname: "asher",
        lastname: "marsden",
        username: "asher.marsden",
        password: "123x@x",
        roles: role.user,
        address: "7979 penn, new castle, pa 16101",
        phone: "(384) 454-4128",
      },
    ]);

    return res.sendStatus(200).end();
  } catch (e) {
    next(e);
  }
};

/**
 * Get users
 */
const find = async (req, res, next) => {
  try {
    const users = await userService.find();

    if (!users) {
      return res.sendStatus(404).end();
    }

    return res.send(users);
  } catch (e) {
    next(e);
  }
};

/**
 * Paging
 */
const paginate = async (req, res, next) => {
  try {
    let query = {};

    // Retrieve parameters from query string
    const { username, firstName, lastName } = req.query;

    if (username) {
      query.username = { $regex: `.*${username}.*` };
    }

    if (firstName) {
      query.firstName = { $regex: `.*${firstName}.*` };
    }

    if (lastName) {
      query.lastName = { $regex: `.*${lastName}.*` };
    }

    // Retrieve paging option
    const pagingOptions = pagingHelper.pagingOptions(req.query);

    const users = await userService.paginate(query, pagingOptions);

    if (!users) {
      return res.sendStatus(404).end();
    }

    return res.send(users);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  seedAdmin,
  seedUsers,
  find,
  paginate,
};
