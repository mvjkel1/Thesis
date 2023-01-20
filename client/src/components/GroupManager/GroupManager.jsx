import { MainContainer } from './GroupManager.styles';
import AddGroup from '../subcomponents/AddGroup/AddGroup';
import EditGroups from '../subcomponents/EditGroups/EditGroups';

export default function GroupManager() {
  return (
    <>
      <MainContainer>
        <AddGroup openByDefault />
        <EditGroups openByDefault />
      </MainContainer>
    </>
  );
}
