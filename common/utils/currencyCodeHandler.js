const verifiedCountry = function (serviceNamePath, countryCode) {    
    if (serviceNamePath !== countryCode) {
    const result = {
            error: " Validation Error : Unauthorized Country"
        }
        return result
    }
}
module.exports = {
    verifiedCountry: verifiedCountry
}
