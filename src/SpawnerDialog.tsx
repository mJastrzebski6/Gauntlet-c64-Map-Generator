import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { ListItemIcon } from '@mui/material';

import gruntIcon from "./assets/Images/gruntIcon.png";
import demonIcon from './assets/Images/demonIcon.png';
import sorcererIcon from './assets/Images/sorcererIcon.png';
import lobberIcon from './assets/Images/lobberIcon.png';
import { SpawnerMonsters } from './Interfaces';


export interface SpawnerDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

function SpawnerDialog({ onClose, open }: SpawnerDialogProps) {

  const options = [
    { label: SpawnerMonsters.grunt, image:  gruntIcon},
    { label: SpawnerMonsters.demon, image:  demonIcon},
    { label: SpawnerMonsters.sorcerer, image: sorcererIcon},
    { label: SpawnerMonsters.lobber, image: lobberIcon},
  ];


  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Choose monster</DialogTitle>
      <List sx={{ pt: 0 }}>
        {options.map((option, index) => (
          <ListItem disableGutters key={index}>
            <ListItemButton onClick={() => handleListItemClick(option.label)}>
              <ListItemIcon>
                <img src={option.image} alt={option.label} style={{ width: 24, height: 24 }} />
              </ListItemIcon>
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
export default SpawnerDialog