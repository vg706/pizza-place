Parse.initialize("HOa7pu3hNfi3xCUSkKzclVZl4XtxwHjlb5odaGdO", "xwV9q0OLSs0fIKYJqqUJsHPrNqPLVsSLAB0DkoZc");
Parse.serverURL = 'https://parseapi.back4app.com';

// async function create() {
//     const player = new Parse.Object('Player');
//     player.set('name', 'Alex');
//     player.set('yearOfBirth', 1997);
//     player.set('emailContact', 'alex@email.com');
//     player.set('attributes', ['fast', 'good endurance']);
    
//     try {
//         const result = await player.save();
//         console.log('New object created with ID:', result.id);
//     } catch (error) {
//         console.error('Failed to save object:', error.message);
//     }
// }

async function retrieveProduct() {
    const query = new Parse.Query("Produto");
    try {
        const product = await query.get("raTBTAffFA");
        document.getElementById("productList").innerHTML = "<h3>"+ product.get("nomeProduto")+"</h>";
        // console.log(product.get("nomeProduto"));
        // console.log(product.get("precoProduto"));
        // console.log(product.get("tamanhoPizza"));
    } catch (error) {
        console.error(error.message);
    }
}
window.onload = function() {
    retrieveProduct()
};
// document.getElementById("createButton").addEventListener("click", async function () {create();});
// document.getElementById("showProducts").addEventListener("click", async function () {retrieveProduct();});
// document.getElementById("productList").addEventListener("")