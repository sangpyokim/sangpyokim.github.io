import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable, uploadString } from 'firebase/storage';
import { app, storage } from './firebase'

function App() {
  const [ file, setFile ] = useState<any>();
  const [ loading, setLoading ] = useState(false);
  const [ download, setDownload ] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.length === 0) return;

    const files = e.target.files!
    const temp: any = [];
    for (let i = 0; i < files?.length; i++) {
      // const fR = new FileReader()
      // fR.readAsDataURL(files[i]);
      // fR.onload = () => {
      //   // temp.push(fR.result)
      // }
      // temp.push(files[0])
      setFile(files[i])
    }
    
  }

  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const storageRef = ref(storage, 'images');

    
    
    // await uploadString(storageRef, file, 'data_url').then(snapshot => {
    //   console.log("done")
    // }).then(() => setLoading(false)).then()

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');

      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      } 
    }, e => {
      console.log(e)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setDownload(downloadURL)
        console.log('File available at', downloadURL);
      });
    })

    console.log(uploadTask)
  }
  
  useEffect(() => {
  }, [])


  return (
    <div>
      <form onSubmit={e => onSubmit(e)} >
        <input type={'file'} multiple={true}  accept='image/*' onChange={e => onChange(e)} />
        <button type='submit' disabled={file && !loading ? false : true} >제출</button>
      </form>

        미리보기
      <div>
        <img width={700} src={file} />
      </div>
    결과
      <div>
      {download}
      </div>
    </div>
  );
}

export default App;
