
module.exports = (req, res) => {
    console.log("userId =>",req.body);
    api.updateData('Type', {
        name: "kai"
    },{
        typeId: "t_1622117135178"
    }).then(response => {
        res.send({data: response})
    }).catch(err => {
        console.log("err =>",err);
    })
}