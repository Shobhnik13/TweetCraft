import Replicate from "replicate";

export default async function handler(req, res){
    if(req.method ==='POST'){
        const {topic,mood}=req.body

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
    try{
        const output = await replicate.run(
            "a16z-infra/llama-2-13b-chat:2a7f981751ec7fdf87b5b91ad4db53683a98082e9ff7bfd12c8cd5ea85980a52",
            {
              input: {
                prompt: `Can you write a tweet on ${topic} and make it ${mood}`,
                system_prompt:'writing viral tweets very easily!'
              }
            }
          );
          res.status(200).json({ tweet:output })
    }catch(err){
        console.log('AI tweet generation failed!',err)
        res.status(500).json({err:'AI tweet generation failed'})
    }
    }
}

