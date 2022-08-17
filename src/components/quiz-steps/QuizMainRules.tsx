import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { List, ListItem, ListItemIcon } from '@mui/material';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    borderRadius: '10px'
  }));

const QuizMainRules: React.FC = () => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Общие правила</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <ArrowRightAltIcon />
                            </ListItemIcon>
                            Все поля являются обязательными для заполнения
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <ArrowRightAltIcon />
                            </ListItemIcon>
                            После заполнения всех полей шага, необходимо нажать на кнопку "Сохранить черновик шага" 
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <ArrowRightAltIcon />
                            </ListItemIcon>
                            Для сохранения черновика, необходимо заполнить все поля текущего шага (не волнуйтесь, подсказки будут вам помогать)
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <ArrowRightAltIcon />
                            </ListItemIcon>
                            Сохранив черновик шага, вы сможете переключаться между шагами без потери данных
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <ArrowRightAltIcon />
                            </ListItemIcon>
                            После корректного заполнения данных всех шагов, появится кнопка "Сохранить квиз"
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Правила шага "Параметра квиза"</Typography>
                </AccordionSummary>
                <AccordionDetails>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default QuizMainRules;