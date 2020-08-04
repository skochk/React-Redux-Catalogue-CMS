import React , {useEffect,useCallback} from 'react';
import {Button, Input, makeStyles, withStyles, MenuItem, Select, InputLabel ,FormLabel , FormControl, FormGroup, FormControlLabel, TextField, Typography, FormHelperText} from '@material-ui/core';
import {useState} from "react";
import {useSelector ,useDispatch} from "react-redux";
import {addGood as addGoodAction} from '../../actions/goodsAction';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {Redirect} from 'react-router-dom';


export default function(props){
   const useStyles = makeStyles(() => ({
        root: {
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        },
        cropArea:{
            marginTop:"20px",
            width:"700px",
            height: "700px",
            display:"flex",
            flexDirection:'column',
            alignItems:'center',
        },
        inputs:{
            display: "flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems:'center',
            maxWidth: '800px',
            minWidth: "400px" 
        },
        fullArea:{
            display: "flex",
            alignItems:"start",
            paddingTop:'20px',
            justifyContent:'space-around'
        },
        inputStyle:{
            marginBottom:"15px",
            width:"300px"
        },
        previewPanel:{
            display:"flex",
            maxWidth: '800px',
            flexWrap:"wrap",
            justifyContent: 'center',
            alignItems:"center",
        },
        preview:{
            border: "1px solid #3f51b5", /* Gray border */
            // borderRadius: "3px",  /* Rounded border */
            padding: "1px", /* Some padding */
            width: "100px", /* Set a small width */
            height:"100px",
            margin: "10px",
            display:"flex",
            justifyContent:'center',
            alignItems:'center',
            cursor:"pointer"
        },
        img:{
            maxWidth:"100%",
            maxHeight:"100%",
        },
        previewCard:{
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        },
        Button:{
            margin:'10px'
        }

    }));
    

    let classes = useStyles();
    let dispatch = useDispatch();
    let categories = useSelector(state=>state.categoryReducer.categories);
    let subcategories = useSelector(state=>state.subcategoryReducer.subcategories);
    let status = useSelector(state=>state.goodsReducer.uploadGoodStatus);
    let statusText = useSelector(state=>state.goodsReducer.statusText);
    let [formDataObject,changeFormDataObject] = useState({name:'',displayName:"",shortDescription:"",idSubcategory:"",idCategory:"",description:"",mainPhoto1:null,photo1:null,price:"",displayPositionInCategory:"",displayPositionInSubcategory:""});
    let [photoPreviewList, setPhotoPreviewList] = useState([]); //preview photos array
    const [upImg, setUpImg] = useState(); //prop img for set crop
    const [imgRef, setImgRef] = useState(null);
    const [resultCrop, setresultCrop] = useState(); //result img after crop
    const [crop, setCrop] = useState({ unit: '%', width: 10,height:10 });
    const [croppedImage, setCroppedImage] = useState(); // img which will be cropped
    const errorHelperText={
        name:"Must be between 1 and 300 characters",
        displayName:'Must be between 1 and 300 characters',
        shortDescription:'Must be between 1 and 100 characters',
        description:' Must be between 50 and 1000 characters',
        price:' Must be between 1 and 100 characters',
        displayPositionInCategory:' Must be between 1 and 5 characters',
        displayPositionInSubcategory:' Must be between 1 and 5 characters',
        idCategory:' Must be selected',
        idSubcategory:' Must be selected',
        mainPhoto1:'Must be selected one photo',
        photo1:'Must be selected 1-10 photos'
    }
    const [formError,setFormError] = useState();
    const [errors,setErrors] = useState({});


    const handleInput = (e)=>{      
        setFormError(false);  
        if(e.target.name === 'mainPhoto1'){
            setErrors({...errors,['mainPhoto1']:false});
            let temp = {...formDataObject};
            temp[e.target.name] = e.target.files[0]; //req.files[0]
            changeFormDataObject(temp);
        }else if(e.target.name === 'photo1'){
            setErrors({...errors,['photo1']:false});
            let temp = {...formDataObject};
            let imgList =[]
            for(let i=0;i<e.target.files.length;i++){ 
                imgList.push(e.target.files[i]);
            }
            console.log('uploaded files:', e.target.files);
            setPhotoPreviewList(imgList);
            temp[e.target.name]=e.target.files; //req.files as array  
            changeFormDataObject(temp);
        }
        else{
            let temp = {...formDataObject};
            temp[e.target.name] = e.target.value;
            changeFormDataObject(temp);
// DATA INPUT VALIDATION FUNCTION WHICH GOING TO STATE AND HELPER TEXT FOR EACH INPUT
            switch(e.target.name){
                case 'name': 
                    if(e.target.value.length < 1 || e.target.value.length > 300){
                        setErrors({
                            ...errors,['name']:true
                        });
                    }else{
                        setErrors({
                            ...errors,['name']:false
                        });
                    };
                    break;
                case 'displayName':
                    if(e.target.value.length < 1 || e.target.value.length > 300){
                        setErrors({
                            ...errors,['displayName']:true
                        });
                    }else{
                        setErrors({
                            ...errors,['displayName']:false
                        });
                    }
                    break;
                case 'idCategory':
                    setErrors({...errors,['idCategory']:false});
                    break;
                case 'idSubcategory':
                    setErrors({...errors,['idSubcategory']:false});
                    break;
                case 'shortDescription':
                    if(e.target.value.length < 1 || e.target.value.length > 100){
                        setErrors({
                            ...errors,['shortDescription']:true
                        });
                    }else{
                        setErrors({
                            ...errors,['shortDescription']:false
                        });
                    }
                    break;
                case 'description':
                    if(e.target.value.length < 50 || e.target.value.length > 1000){
                        setErrors({
                            ...errors,['description']:true
                        });
                    }else{
                        setErrors({
                            ...errors,['description']:false
                        });
                      }
                    break;
                case "price":
                    if(e.target.value.length < 1 || e.target.value.length > 100){
                        setErrors({
                            ...errors,['price']:true
                        });
                    }else{
                        setErrors({
                            ...errors,['price']:false
                        });
                    }
                    break;
                case "displayPositionInCategory":
                    if(e.target.value.length < 1 || e.target.value.length > 5){
                        setErrors({
                            ...errors,['displayPositionInCategory']:true
                        });
                    }else{
                        setErrors({
                            ...errors,['displayPositionInCategory']:false
                        });
                    }
                    break;
                case "displayPositionInSubcategory":
                    if(e.target.value.length < 1 || e.target.value.length > 5){
                        setErrors({
                            ...errors,['displayPositionInSubcategory']:true
                        });
                    }else{
                        setErrors({
                            ...errors,['displayPositionInSubcategory']:false
                        });
                    }
                    break;
                case "idCategory":
                    if(e.target.value == null){
                        setErrors({
                            ...errors,['idCategory']:true
                        });
                    }else{
                        setErrors({
                            ...errors,['idCategory']:false
                        });
                    }
                    break;
                case "idSubcategory":
                    if(e.target.value == null){
                        setErrors({
                            ...errors,['idSubcategory']:true
                        });
                    }else{
                        setErrors({
                            ...errors,['idSubcategory']:false
                        });
                    }
                    break;
            }        
        }
    }

    const handleSubmit = async (e) =>{
        console.log("errors",errors);
        let isOK = true;
        //check if errors = {} where user not entered anything and pressed button
        if(Object.keys(errors).length === 0 && errors.constructor === Object){
            isOK = false;
            setFormError(true);
        }
        
        // checking not used fields and marking them like error 
        let tempObj = {}
        Object.keys(formDataObject).forEach(key=>{
            if(errors[key] !== false){
                isOK = false;
                tempObj[key] = true;
                setFormError(true);
                console.log("loop check, key, value:",key, errors[key])
            }else{
                tempObj[key] = false;
            }
        })
        setErrors(tempObj);
        console.log(errors);

        if(isOK){ // send request if no errors
            console.log('request will be sent');
            let formData = new FormData();
            Object.keys(formDataObject).forEach(key=>{
                if(key === "photo1"){
                    for(let i=0;i<photoPreviewList.length;i++){
                        formData.append(key,photoPreviewList[i]);
                    }   
                }else{
                    formData.append(key,formDataObject[key]);
                }
            })
            console.log(JSON.stringify(formData));
            dispatch(addGoodAction(formData));
        }
    }
    const callCrop = (src)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => setUpImg(reader.result));
        reader.readAsDataURL(src);
    }
    const SaveCrop = ()=>{ 
        setUpImg(null);
        setCrop({ unit: '%', width: 10,height:10 });
        if(croppedImage === -1){ // -1  -- means mainphoto1
            formDataObject.mainPhoto1 = resultCrop;
        }else{
            let tempArr = photoPreviewList;
            tempArr[croppedImage] = resultCrop;
            setPhotoPreviewList(tempArr);   
        }
    }
    const makeClientCrop = async crop => {
        if (imgRef && crop.width && crop.height) {
        createCropPreview(imgRef, crop, 'newFile.jpeg');
        }
    };
    const createCropPreview = async (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
        image, crop.x * scaleX,crop.y * scaleY,crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height
        );
        const base64Image = canvas.toDataURL('image/jpeg');
        function dataURLtoFile(dataurl, filename) {
    
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
                
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
        let file = dataURLtoFile(base64Image,'keke.jpeg');
        console.log(file);
        setresultCrop(file);
    }; 
    const onLoad = useCallback(img => {
        setImgRef(img);
    }, []);
    useEffect(()=>{
        console.log('status',status);

    },[status])
    return (
        <div className={classes.fullArea}>
        {status == "success" ? <Redirect to='/goods'/> : null}
             <FormControl required component="fieldset" error={formError} className={classes.inputs}>
                <TextField required error={errors.name} helperText={errors.name ? errorHelperText.name : null} id="name" label="Name" name="name" onChange={handleInput} className={classes.inputStyle}/>
                <TextField  id="displayName" required  error={errors.displayName} helperText={errors.displayName ? errorHelperText.displayName : null} label="Display Name" name="displayName" onChange={handleInput} className={classes.inputStyle} />
                <FormControl error={errors.idCategory}>
                    <InputLabel id="idCategory">Category ID</InputLabel>
                    <Select 
                        id="idCategory"
                        required
                        name="idCategory"
                        onChange={handleInput}
                        style={{width:"300px"}}
                        value={formDataObject.idCategory || ""}
                        input={<Input name="idCategory" id="idCategory" value="idCategory"/>}
                    >
                        {categories.map((item)=>(
                            <MenuItem key={item._id} value ={item._id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.idCategory ? errorHelperText.idCategory: null}</FormHelperText>
                </FormControl>
                <FormControl error={errors.idSubcategory}>
                    <InputLabel id="idSubcategory">Subcategory ID</InputLabel>
                    <Select
                        id="idSubcategory"
                        required
                        error={errors.idSubcategory}
                        name="idSubcategory"
                        onChange={handleInput}
                        style={{width:"300px"}}
                        input={<Input name="idSubcategory" id="idSubcategory" value="idSubcategory"/>}
                        value={formDataObject.idSubcategory || ""}
                    >
                        {subcategories.map((item)=>(
                            <MenuItem key={item._id} value ={item._id}>{item.name}</MenuItem>
                        ))}   
                    </Select>
                    <FormHelperText>{errors.idSubcategory ? errorHelperText.idSubcategory : null}</FormHelperText>
                </FormControl>
                <TextField id="shortDescription"  error={errors.shortDescription ? errors.shortDescription : null} helperText={errors.shortDescription ? errorHelperText.shortDescription : null} name="shortDescription" onChange={handleInput} label="Short Description" className={classes.inputStyle}/>
                <TextField id="description" multiline error={errors.description} helperText={errors.description ? errorHelperText.description : null} name="description" onChange={handleInput}  label="Description" className={classes.inputStyle}/>
                <TextField id="price" name="price" required error={errors.price} helperText={errors.price ? errorHelperText.price : null} onChange={handleInput}  label="Price" className={classes.inputStyle}/>
                <TextField id="displayPositionInCategory" required error={errors.displayPositionInCategory} helperText={errors.displayPositionInCategory ? errorHelperText.displayPositionInCategory : null} name="displayPositionInCategory"  label="Display Position In Category" onChange={handleInput} className={classes.inputStyle}/>
                <TextField id="displayPositionInSubcategory" required error={errors.displayPositionInSubcategory} helperText={errors.displayPositionInSubcategory ? errorHelperText.displayPositionInSubcategory : null} name="displayPositionInSubcategory"  label="Display Position In Subcategory" onChange={handleInput} className={classes.inputStyle}/>
                <TextField id="mainPhoto1" type="file" required error={errors.mainPhoto1} helperText={errors.mainPhoto1 ? errorHelperText.mainPhoto1 : null} name="mainPhoto1" inputProps={{accept:"image/*"}} onChange={handleInput} style={{display:"none"}}/>
                <label htmlFor="mainPhoto1">
                    <Button variant="contained" color="primary" component="span" className={classes.Button}>Upload MAIN</Button>
                </label>
                <TextField id="photo1" type="file" name="photo1" required error={errors.photo1} helperText={errors.photo1 ? errorHelperText.photo1 : null} inputProps={{ multiple: true, accept:"image/*"}}  onChange={handleInput} style={{display:"none"}}/>
                <label htmlFor="photo1">
                    <Button variant="contained" color="primary" component="span" className={classes.Button}>Upload photos</Button>
                </label>
                {formError ? <FormHelperText>Please enter correctly all fields</FormHelperText> : null}
                <Button  type="submit" onClick={handleSubmit} color="primary">ADD</Button>
        </FormControl>
            <div>
                <div className={classes.previewPanel}>
                {formDataObject.mainPhoto1 ? 
                    <div className={classes.previewCard}>
                        <div className={classes.preview} onClick={()=>{callCrop(formDataObject.mainPhoto1);setCroppedImage(-1)}}>
                            <img key={formDataObject.mainPhoto1.lastModified} className={classes.img} src={URL.createObjectURL(formDataObject.mainPhoto1)} />
                        </div> 
                        <Typography>Main photo</Typography>
                    </div>
                : null}
                {photoPreviewList.map((el,index)=>(
                    <div className={classes.previewCard}  key={el.lastModified}>
                        <div className={classes.preview} onClick={()=>{callCrop(el);setCroppedImage(index)}}>
                            <img className={classes.img} src={URL.createObjectURL(el)} />
                        </div>
                        <Typography>{el.name.length > 8 ? el.name.substring(0,8).concat("...") : el.name}</Typography>
                    </div>
                ))} 
                </div>
                <div className={classes.cropArea}>
                {upImg ? <>
                    <Button onClick={SaveCrop}  variant="contained">Save changes</Button>
                    <ReactCrop 
                    src={upImg} 
                    crop={crop} 
                    onImageLoaded={onLoad}
                    onChange={c => setCrop(c)} 
                    onComplete={makeClientCrop}/>
                </> : null}
                </div>
            </div>
        </div>
    ); 
}
