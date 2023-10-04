// 参考: https://qiita.com/kalbeekatz/items/bd9c3e8aff6117fdae42
// reactStrictModeを外さないとエラーが出る？ https://github.com/atlassian/react-beautiful-dnd/issues/2407
// https://medium.com/@wbern/getting-react-18s-strict-mode-to-work-with-react-beautiful-dnd-47bc909348e4で対応？
import DragDropSort from '@/components/DragDropSort'

const DragDropSortPage = () => {
  return <DragDropSort />
}

export default DragDropSortPage
