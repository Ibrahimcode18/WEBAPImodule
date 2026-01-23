function getData(){
    return new Promise((resolve) => {
        setTimeout(() =>{
            resolve("Data loaded");
        }, 3000);
    });
}

async function run(){
    console.log("1. Start");
    const data = await getData();
    console.log("2. ", data);
    console.log("3. End");
}

run()