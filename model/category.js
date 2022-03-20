import Http from "../utils/http"

class Category{
    static async getCategoryList(mock=false){
        return Http.request({
            url:'v1/category',
            data:"",
            method:"GET",
            mock
        })
    }
    static async getCategoryListWithAll(){
        const categoryList = await Category.getCategoryList()
        categoryList.unshift({_id:0,name:'全部'})
        return categoryList;
    }
    static async getImageCategoryListWithAll(){
        const categoryList = await Category.getCategoryList(true)
        return categoryList;
    }
}
export default  Category