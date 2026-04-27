const getHashtags= (text)=>{
    let data = text.split(" ");
    return data.filter((x)=> x.startsWith("#"));
}
const daaa =getHashtags("hello my name is prakhar #absxcc #whatmyname")

// hello my name is prakhar #absxcc #whatmyname
// www www wc #asd
