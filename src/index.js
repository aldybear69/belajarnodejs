// ! TENTANG VAR dan LET dalam JAVASCRIPT
// * Dalam javascript itu sistem yang dianut adalah Function Scope,
// * kalau di bahasa lain adalah Block Scope
// * sehingga variable var dalam javascript akan berperilaku seperti ini :

function main() {
  for (var i = 0; i < 10; i++) {
    console.log(i);
  }
  // var i dipanggil di luar fungsi loop forr masih tetap bisa mendapatkan nilainya
  console.log(i);
}
main();

// * kalau di bahasa lain tidak akan bisa mengakses var i akan undefined error
// * seperti contoh pada script dart di bawah ini :
// void main() {
//   for(var i = 0; i < 10; i++){
//     print(i);
//   }
//     print(i);
// }

// * maka dalam javascript itu diakalin pake yg namanya konsep IIFE / SIAF
// * IIFE = Immediately Invoked Function Expression
// * SIAF = Self Invoking Anonymous Function
// * seperti di bawah ini :

(function test() {
  for (var j = 0; j < 10; j++) {
    console.log(j);
  }
})();
// var j dipanggil di luar fungsi sudah tidak bisa mendapatkan nilainya
// console.log(j); //error is not defined

// * maka dari itu dianjurkan untuk menggunakan atau mengganti semua VAR dengan LET
// * karena perilaku LET sudah Block Scope sama seperti bahasa lain
// * contohnya seperti ini :
function tes() {
  for (let k = 0; k < 10; k++) {
    console.log(k);
  }
  // var i dipanggil di luar fungsi loop forr masih tetap bisa mendapatkan nilainya
  // console.log(k); // akan error is not defined karena di panggil dari luar
}
tes();
