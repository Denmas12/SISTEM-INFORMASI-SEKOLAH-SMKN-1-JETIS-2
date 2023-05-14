<template>
  <div>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Data Guru</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active">Data Guru</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <div class="card-tools">
                  <button
                    type="button"
                    class="btn btn-success mb-2"
                    @click="showModal"
                  >
                    Tambah Guru
                  </button>
                </div>
              </div>
              <div class="card-body">
                <table id="example2" class="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>NIP</th>
                      <th>Name</th>
                      <th>Tanggal Lahir</th>
                      <th>Jenis Kelamin</th>
                      <th>Alamat</th>
                      <th>Mengajar</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(guru, index) in gurus" :key="index.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ guru.nip }}</td>
                      <td>{{ guru.name }}</td>
                      <td>{{ guru.tgl_lahir }}</td>
                      <td>{{ guru.jkg }}</td>
                      <td>{{ guru.alamat }}</td>
                      <td>{{ guru.mapel.name_mapel }}</td>
                      <td>
                        <a
                          href="#"
                          class="badge bg-info mr-2"
                          @click="showModalEdit(guru.id)"
                          ><i class="fas fa-edit"></i
                        ></a>
                        <a
                          href="#"
                          class="badge bg-danger"
                          @click="deleteData(guru.id)"
                          ><i class="fas fa-trash-alt"></i
                        ></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="modalmuncul"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalmuncul1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="exampleModalLongTitle"
                v-show="!statusmodal"
              >
                Tambah Pengguna
              </h5>
              <h5
                class="modal-title"
                id="exampleModalLongTitle"
                v-show="statusmodal"
              >
                Ubah Pengguna
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" @click="resetForm()">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="card card-default">
                <!-- /.card-header -->
                <!-- form start -->
                <form
                  @submit.prevent="statusmodal ? updateData() : simpanData()"
                >
                  <div class="card-body">
                    <div class="form-group">
                      <label for="nip">NIP</label>
                      <input
                        type="number"
                        class="form-control"
                        id="nip"
                        placeholder="NIP"
                        v-model="form.nip"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Name"
                        v-model="form.name"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="tgl_lahir">Tanggal Lahir</label>
                      <input
                        type="date"
                        class="form-control"
                        id="tgl_lahir"
                        placeholder="Tanggal Lahir"
                        v-model="form.tgl_lahir"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label>Jenis Kelamin</label>
                      <select
                        class="form-control select2"
                        v-model="form.jkg"
                        required
                      >
                        <option disabled value="">-- Pilih --</option>
                        <option value="laki-laki">Laki-Laki</option>
                        <option value="perempuan">Perempuan</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="alamat">Alamat</label>
                      <input
                        type="text"
                        class="form-control"
                        id="alamat"
                        placeholder="Alamat"
                        v-model="form.alamat"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label>Mengajar</label>
                      <select
                        class="form-control select2"
                        v-model="form.mapelId"
                        required
                      >
                        <option disabled value="">-- Pilih --</option>
                        <option
                          v-for="mapel in mapels"
                          :key="mapel.id"
                          :value="mapel.id"
                        >
                          {{ mapel.name_mapel }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="resetForm()"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="disabled"
                      v-show="!statusmodal"
                    >
                      <i v-show="loading" class="fa fa-spinner fa-spin"></i>
                      Simpan
                    </button>
                    <button
                      type="submit"
                      class="btn btn-success"
                      :disabled="disabled"
                      v-show="statusmodal"
                    >
                      <i v-show="loading" class="fa fa-spinner fa-spin"></i>
                      Ubah
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import GuruService from "../../services/guru.service";
import MapelService from "../../services/mapel.service";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      loading: false,
      disabled: false,
      gurus: {},
      mapels: {},
      statusmodal: false,
      form: {
        id: "",
        nip: "",
        name: "",
        tgl_lahir: "",
        jkg: "",
        alamat: "",
        mapelId: "",
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.getdata();
  },
  methods: {
    showModal() {
      this.statusmodal = false;
      this.resetForm();
      $("#modalmuncul").modal("show");
    },
    showModalEdit(guru) {
      this.statusmodal = true;
      $("#modalmuncul").modal("show");
      this.getGuruById(guru);
    },
    getdata() {
      this.$Progress.start();
      GuruService.getGuru()
        .then((response) => {
          this.gurus = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
      MapelService.getMapel()
        .then((response) => {
          this.mapels = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
      this.$Progress.finish();
    },
    getGuruById(id) {
      GuruService.getGuruById(id)
        .then((response) => {
          this.form = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    simpanData() {
      this.$Progress.start();
      this.loading = true;
      this.disabled = true;
      GuruService.createGuru(this.form)
        .then((response) => {
          this.from = response.data;
          console.log(response.data);
          this.getdata();
          this.resetForm();
          $("#modalmuncul").modal("hide");
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Data Berhasil Tersimpan",
          });
          this.$Progress.finish();
          this.loading = false;
          this.disabled = false;
        })
        .catch((e) => {
          this.$Progress.fail();
          this.loading = false;
          this.disabled = false;
          console.log(e);
        });
    },
    updateData() {
      this.$Progress.start();
      this.loading = true;
      this.disabled = true;
      GuruService.updateGuru(this.form.id, this.form)
        .then((response) => {
          this.from = response.data;
          console.log(response.data);
          this.getdata();
          this.resetForm();
          $("#modalmuncul").modal("hide");
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Data Berhasil Terupdate",
          });
          this.$Progress.finish();
          this.loading = false;
          this.disabled = false;
        })
        .catch((e) => {
          this.$Progress.fail();
          this.loading = false;
          this.disabled = false;
          console.log(e);
        });
    },

    deleteData(id) {
      Swal.fire({
        title: "Anda Yakin Ingin Menghapus Data Ini ?",
        text: "Klik Batal Untuk Membatalkan Penghapusan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus",
      }).then((result) => {
        if (result.value) {
          GuruService.deleteGuru(id)
            .then((response) => {
              Swal.fire("Terhapus", "Data Anda Sudah Terhapus", "success");
              console.log(response.data);
              this.getdata();
            })
            .catch(() => {
              Swal.fire("Gagal", "Data Gagal Terhapus", "warning");
            });
        }
      });
    },

    resetForm() {
      (this.form.nip = ""),
        (this.form.name = ""),
        (this.form.tgl_lahir = ""),
        (this.form.jkg = ""),
        (this.form.alamat = ""),
        (this.form.mapelId = "");
    },
  },
};
</script>