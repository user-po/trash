//基类
class Base{
   page = 1
   count = 4
   data = []
   hasMoreData = true
   
   reset(){
    this.page = 1
    this.count = 4
    this.data = []
    this.hasMoreData = true
    return this;
  }
}
export default Base;