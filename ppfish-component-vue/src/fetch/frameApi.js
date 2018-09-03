/**
 * Created by JianBo.Wang on 2018/9/3.
 */
import {fetchGet} from './api'

export default {
  /**
   * 应用框架级接口，如侧边栏信息，导航栏信息
   */
  // 获取左侧导航栏信息
  GetNavMenu () {
    return fetchGet('/json/navMenu.json')
    // let params = {
    //   userCode: sessionStorage.getItem('userCode')
    // }
    // return fetchGet('/dt-sentiment/menu/navMenu', params)
  }
}
