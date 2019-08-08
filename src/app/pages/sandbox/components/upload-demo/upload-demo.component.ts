import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifyService } from 'app/core/services/notify.service';
import { NotifySeverity } from 'app/core/enums/notify-severity.enum';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { FileService } from './file.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-upload-demo',
  templateUrl: './upload-demo.component.html',
  styleUrls: ['./upload-demo.component.scss']
})
export class UploadDemoComponent implements OnInit {
  fileList: FileList;
  form: FormGroup;

  @ViewChild(FileUpload)
  private fileupload: FileUpload;

  constructor(
    private fb: FormBuilder,
    private fileService: FileService,
    private notifyService: NotifyService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      uploadName: ['', Validators.required],
      files: this.fb.array([], Validators.required)
    });
  }

  setFiles(event) {
    this.form.setControl(
      'files',
      new FormArray(
        Array.from(event.files || []).map(x => new FormControl(x)),
        Validators.required
      )
    );
  }
  clear() {
    this.form.setControl('files', new FormArray([], Validators.required));
  }

  submit() {
    const formData = this.form.value;
    const generalLang = this.translate.instant('general');
    this.fileService.post(formData.files, formData.uploadName).subscribe(_ => {
      this.notifyService.notify(
        NotifySeverity.success,
        generalLang['success'],
        generalLang['successUpdatefile']
      );

      this.form.reset();
      this.fileupload.clear();
    });
  }
}
