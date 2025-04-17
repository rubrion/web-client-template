import LanguageIcon from '@mui/icons-material/Language';
import { IconButton, ListItemText, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

import { useLanguage } from '../../context/LanguageContext';

interface LanguageSwitcherProps {
  color?: string;
  sx?: Record<string, any>;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ sx = {} }) => {
  const { languages, changeLanguage, currentLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-label="Select language"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={sx}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
      >
        {languages.map((language) => {
          const langName =
            language.code === 'en'
              ? 'English'
              : language.code === 'es'
                ? 'Spanish'
                : 'Portuguese';

          return (
            <MenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              selected={currentLanguage === language.code}
            >
              <ListItemText>{langName}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
