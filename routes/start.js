const express=require('express')
const router=express.Router()

router.get("/",(req,res)=>{
    res.send("welcome to api<br>correct path : /game/start")
});

function generate_choice(){
    input=[]
    for(x=0;x<4;x++){
        var val=Math.floor((Math.random() * 2) + 1);
        input[x]=val;
    }
    return input;
}

function solve(x,y){
    if(x===0 && y===2)return 1;
    else if(x===1 && y===0)return 1;
    else if(x===2 && y===1)return 1;
    else return 0;
}
helping_func=async()=>{
        
    input=generate_choice();
    const player1={
        player2:solve(input[0],input[1]),
        player3:solve(input[0],input[2]),
        player4:solve(input[0],input[3])
    }
    const player2={
        player1:solve(input[1],input[0]),
        player3:solve(input[1],input[2]),
        player4:solve(input[1],input[3])
    }
    const player3={
        player1:solve(input[2],input[0]),
        player2:solve(input[2],input[1]),
        player4:solve(input[2],input[3])
    }
    const player4={
        player2:solve(input[3],input[0]),
        player3:solve(input[3],input[1]),
        player4:solve(input[3],input[2])
    }
    var choice_data=['Rock','Paper','Scissor']
    const input_data={
        player1:choice_data[input[0]],
        player2:choice_data[input[1]],
        player3:choice_data[input[2]],
        player4:choice_data[input[3]]
    }
    return({'input':input_data,
    result:[{'player1':player1},{player2:player2},{'player3':player3},{player4:player4}]});
}
router.get("/start",async (req,res)=>{

    try{
        result={}
        for(i=0;i<50;i++){
            const iteration=await helping_func();
            result[i]=iteration
        }
        res.status(200).json({results:result});
    }
    catch(err){
        res.json({'result':'error occurred'})
    }
    
})

module.exports=router