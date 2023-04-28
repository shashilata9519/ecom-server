/*
new SearchFeatures(allproduct,allparams)

product.find({}) ///allproduxt
product.find({
    product_name:{
        $regex:allaparms.keyword,
        $options:"i"
    }
})



this={}
this.query=""

this.queryString="hgh"

console.log(this)

*/

class SearchFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          product_name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryString }; // {keyword:"",price[lte]:0}
    const removeField = ["keyword"];
    removeField.forEach((key) => delete queryCopy[key]);
    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );
    console.log(queryString); // {"price":{"$gte":"0","$lte":"8489"},"page":"1"}

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  pagination(resultPerPage) {
    // currentPage

    const currentPage = Number(this.queryString.page) || 1;
    const skipProducts = resultPerPage * (currentPage - 1); // 10*(1-1)=0 //10*(2-1)=10 //10*(3-1)=20
    this.query = this.query.limit(resultPerPage).skip(skipProducts); //firsttime=10 second=
    // console.log(this.query,'skip')
    return this;
  }
}

module.exports = SearchFeatures;
