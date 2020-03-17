import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      products:[],
      id:'',
      Title:'',
      Description:'',
      Price:'',
      Img:'',
      searchVal:'',
      ErrorMsg:'',
      toastTheme:'',
      SubmitBtnType:'SUBMIT',
      editChanger:'',
      imgSrc:''
    }
   
  }

  componentDidMount(){
    axios.get('http://localhost:4000/products/filter/all')
    .then((res)=>{
      this.setState({
        products:res.data,
        id:0,
        Title:'',
        Description:'',
        Price:'',
        ImgPath:'',
        searchVal:'',
        ErrorMsg:'',
        toastTheme:'',
        SubmitBtnType:'SUBMIT',
        editChanger:'',
        imgSrc:''
      })
        
    }
    )
  }

  titleChange=event=>{
    this.setState({
      Title:event.target.value
    })
  }

  descriptionChange=event=>{
    this.setState({
      Description:event.target.value
    })
  }
  priceChange=event=>{
    this.setState({
      Price:event.target.value
    })
  }

  fileChange=event=>{
    let file=event.target.files[0]
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
  
     reader.onloadend = function (e) {
        this.setState({
            imgSrc: [reader.result],
            ImgPath:''
        })
      }.bind(this);
    this.setState({
      Img:file,
      editChanger:'imgUpdate'
    })
  }
  searchChange=event=>{
    this.setState({
      searchVal:event.target.value
    })
  }

  searchByTitle(){
    let param=this.state.searchVal
    axios.get(`http://localhost:4000/products/filter/${param}`)
    .then((res)=>{
      this.setState({
        products:res.data
      })})
  }

  reset(){
    this.componentDidMount()
  }

  submit(event,id){
    let file=this.state.Img
    let formData=new FormData()

    formData.append('ImgPath',file)
    formData.append('Title',this.state.Title)
    formData.append('Description',this.state.Description)
    formData.append('Price',this.state.Price)
    event.preventDefault(); 
   

    if(id===0){
      axios({
        url:`http://localhost:4000/products/`,
        method:"POST",
        headers: { 'content-type': 'multipart/form-data' },
        data:formData
      })
      .then((res)=>{
        this.setState({
          ErrorMsg:res.data
        })
        if(res.data!=='success'){
          this.setState({
            toastTheme:toast.TYPE.ERROR
          })
        }
        else{
          this.setState({
            toastTheme:toast.TYPE.SUCCESS
          })
        }
        this.notify()
        this.componentDidMount()
      }).catch((err)=>{
        console.log(err)
      })
    }
    else{
      axios({
        url:`http://localhost:4000/products/${this.state.editChanger}/${id}`,
        method:"PUT",
        headers: { 'content-type': 'multipart/form-data' },
        data:formData
      })
      .then((res)=>{
        this.setState({
          ErrorMsg:res.data
        })
        if(res.data!=='success'){
          this.setState({
            toastTheme:toast.TYPE.ERROR
          })
        }
        else{
          this.setState({
            toastTheme:toast.TYPE.SUCCESS
          })
        }
        this.notify()
        this.componentDidMount()
      }).catch((err)=>{
        console.log(err)
      })
    }
  }

  delete(id){
    axios.delete(`http://localhost:4000/products/${id}`)
    .then(()=>{
      this.componentDidMount()
    })
  }
 
  edit(id){
    
    axios.get(`http://localhost:4000/products/${id}`)
    .then((res)=>{
      var imgUrl = `http://localhost:4000/${res.data.ImgPath}`;
      this.setState({
        id:res.data._id,
        ImgPath:imgUrl.replace("Product\\",""),
        Title:res.data.Title,
        Description:res.data.Description,
        Price:res.data.Price,
        SubmitBtnType:'UPDATE'
      })
    })
  }

  view(id){
    axios.get(`http://localhost:4000/products/${id}`)
    .then((res)=>{
      var imgUrl = `http://localhost:4000/${res.data.ImgPath}`;
      var newimgUrl=imgUrl.replace("Product\\","");
      this.setState({
        id:res.data._id,
        ImgPath:newimgUrl,
        Title:res.data.Title,
        Description:res.data.Description,
        Price:res.data.Price,
      })
    })
    
  }

  notify = () => toast(this.state.ErrorMsg,{type: this.state.toastTheme});
  render(){
  return (
    <div className="row">
    <ToastContainer />   
    <div className="col s5">
      <form onSubmit={(e)=>this.submit(e,this.state.id)}>
        <div className="input-field col s12">
        <label >Title</label>
        </div>
        <div className="input-field col s12">
          <input value={this.state.Title} onChange={(e)=>this.titleChange(e)} type="text" />
          
        </div>
        <div className="input-field col s12">
        <label >Description</label>
        </div>
        <div className="input-field col s12">
          <input value={this.state.Description} onChange={(e)=>this.descriptionChange(e)} type="text" />
          
        </div>
        <div className="input-field col s12">
        <label >Price</label>
        </div>
        <div className="input-field col s12">
          <input value={this.state.Price} onChange={(e)=>this.priceChange(e)} type="text"  />
          
        </div>
        <img src={this.state.ImgPath} width="400px"/>
        <div className="input-field col s12">
          
          <input onChange={(e)=>this.fileChange(e)} type="file" id="autocomplete-input" className="autocomplete"  />
          <img src={this.state.imgSrc} width="400px"/>
        </div>
        <button className="btn waves-effect waves-light right" type="submit" name="action">{this.state.SubmitBtnType}
                <i className="material-icons right">send</i>
        </button>
      </form>

    </div>
    <div className="col s7">
    <div className="input-field col s12">
    <input value={this.state.searchVal} onChange={(e)=>this.searchChange(e)} type="text" id="autocomplete-input" className="autocomplete"  />
    <label >Search by Title</label>
    </div>
    <button onClick={(e)=>this.searchByTitle()} className="btn waves-effect waves-light" type="submit" name="action">
                <i className="material-icons">search</i>
    </button>
    <button onClick={(e)=>this.reset()} className="btn waves-effect waves-light" type="submit" name="action">
                <i className="material-icons">cached</i>
    </button>
    <table>
        <thead>
          <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {this.state.products.map(product=>
            <tr key={product._id}>
            <td>{product.Title}</td>
            <td>{product.Description}</td>
            <td>{product.Price}</td>
            <td><img src={`http://localhost:4000/${product.ImgPath.replace("Product\\","")}`} width="50px" height="50"/></td>
            <td> 
            <button onClick={(e)=>this.edit(product._id)} className="btn waves-effect waves-light" type="submit" name="action">
                <i className="material-icons">edit</i>
            </button>
            </td>
            <td>
            <button onClick={(e)=>this.delete(product._id)} className="btn waves-effect waves-light" type="submit" name="action">
                <i className="material-icons">delete</i>
            </button>
            </td>
          </tr>
            )}
          
        </tbody>
      </table>
    </div>
    
    </div>
  );
}
}
export default App;
