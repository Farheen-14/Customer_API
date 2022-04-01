//get cutomer data from json file
const customerData = require('../src/customers.json')


exports.getCustomerData = (req, res, next) => {
  try {
    const Data = res.status(200).json(customerData)
    return Data;
  } catch (err) {
    res.status(500).json({ message: err.message })

  }
}



exports.getFilterData = (req, res, next) => {
  const filterData = req.query.filter
  const getData = customerData.filter(customer => customer.first_name == filterData || customer.last_name == filterData)
  if (getData.length > 0) {
    res.status(200).json({ "message": "Your Query is :  ", getData })

  }
  else {
    res.status(500).json({ "message": "Wrong Input" })

  }
}



exports.getSupportQuery = (req, res, next) => {
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const gender = req.query.gender;
  const email = req.query.email;
  const car_make = req.query.car_make;
  const sort = req.query.sort;
  const limit = +req.query.limit;
  const page = +req.query.page;

  let filteredQuery;

  if (Object.keys(req.query).length > 0) {
    if (first_name) {
      filteredQuery = customerData.filter(
        (customer) =>
          customer.first_name.toLowerCase() === first_name.toLowerCase()
      );
    }
    if (last_name) {
      if (filteredQuery) {
        filteredQuery = filteredQuery.filter(
          (customer) =>
            customer.last_name.toLowerCase() === last_name.toLowerCase()
        );
      } else {
        filteredQuery = customerData.filter(
          (customer) =>
            customer.last_name.toLowerCase() === last_name.toLowerCase()
        );
      }
    }
    if (gender) {
      if (filteredQuery) {
        filteredQuery = filteredQuery.filter(
          (customer) => customer.gender.toLowerCase() === gender.toLowerCase()
        );
      } else {
        filteredQuery = customerData.filter(
          (customer) => customer.gender.toLowerCase() === gender.toLowerCase()
        );
      }
    }
    if (email) {
      if (filteredQuery) {
        filteredQuery = filteredQuery.filter(
          (customer) => customer.email.toLowerCase() === email.toLowerCase()
        );
      } else {
        filteredQuery = customerData.filter(
          (customer) => customer.email.toLowerCase() === email.toLowerCase()
        );
      }
    }
    if (car_make) {
      if (filteredQuery) {
        filteredQuery = filteredQuery.filter(
          (customer) =>
            customer.car_make.toLowerCase() === car_make.toLowerCase()
        );
      } else {
        filteredQuery = customerData.filter(
          (customer) =>
            customer.car_make.toLowerCase() === car_make.toLowerCase()
        );
      }
    }
    if (limit && page) {
      const dataToSkip = (page - 1) * limit;
      if (filteredQuery) {
        if (filteredQuery.length < limit) {
          filteredQuery = [...filteredQuery]
        }
        else {

          filteredQuery = filteredQuery.slice(dataToSkip, dataToSkip + 10);
        }
      } else {
        filteredQuery = customerData.slice(dataToSkip, dataToSkip + 10);
      }
    }
  } else {
    filteredQuery = [...customerData];
  }

  if (sort) {
    const sortby = sort.split(":")[0];
    const criteria = sort.split(":")[1];
    let arrayToSort = filteredQuery || customerData;

    if (sortby === "first_name") {
      if (criteria === 'DESC') {
        arrayToSort.sort((a, b) => {
          if (a.first_name > b.first_name) return -1;
          if (a.first_name < b.first_name) return 1;
          return 0;
        });
      }
      else {
        arrayToSort.sort((a, b) => {
          if (a.first_name > b.first_name) return 1;
          if (a.first_name < b.first_name) return -1;
          return 0;
        });
      }
    }
    else {
      if (criteria === 'DESC') {
        arrayToSort.sort((a, b) => {
          if (a.last_name > b.last_name) return -1;
          if (a.last_name < b.last_name) return 1;
          return 0;
        });
      }
      else {
        arrayToSort.sort((a, b) => {
          if (a.last_name > b.last_name) return 1;
          if (a.last_name < b.last_name) return -1;
          return 0;
        });
      }
    }
    filteredQuery = [...arrayToSort];
  }

  if (filteredQuery.length > 0) {
    res.status(201).json({ customerData: filteredQuery });
  } else {
    res.status(400).status({ message: "Data not found!!!" });
  }
};










