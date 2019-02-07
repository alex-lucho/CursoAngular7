import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent implements OnInit {

  uploadForm: FormGroup;
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  uploadSubmit() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      const fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert('Each File should be less than 10 MB of size.');
        return;
      }
    }
    for (let j = 0; j < this.uploader.queue.length; j++) {
      const data = new FormData();
      const fileItem = this.uploader.queue[j]._file;
      console.log(fileItem.name);
      data.append('file', fileItem);
      data.append('fileSeq', 'seq' + j);
      data.append('dataType', this.uploadForm.controls.type.value);
      // tslint:disable-next-line:no-shadowed-variable
      this.uploadFile(data).subscribe(data => alert(data.message));
    }
    // this.uploader.clearQueue();
  }

  uploadFile(data: FormData): Observable<any> {
    // tslint:disable-next-line:no-debugger
    // debugger;
    return this.http.post<any>('https://api.imgur.com/3/image', data);
  }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null],
      type:  [null, Validators.compose([Validators.required])]
    });
  }

}
