import React, { useState, useEffect  } from 'react';
import '../scss/home.scss'

import { GetDownloadList } from '../ApiController/ApiController'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LoadingSpinners from '../LoadingSpinners/LoadingSpinners';
import GetAppIcon from '@material-ui/icons/GetApp';
import { TableContainer, Table, TableCell, TableHead, TableRow , TableBody } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const acerColor = '#83B81A';
const predatorColor = '#00beee;';

// for modify material-ui component color
const useStyles = makeStyles((theme) => ({
    button: {
      color: acerColor,
      border: '1px solid'
    },
    tableHeadBGColor: {
        background: acerColor
    },
    tableHeadFontColor: {
        color: '#FFFFFF'
    }
  }));

export default function Home() {
    // 宣告一個新的 state 變數，我們叫他「downloadList」
    const [downloadList, setDownloadList] = useState('');
    const [deviceInfoList, setDeviceInfoList] = useState('');

    const classes = useStyles();

    useEffect(()=>{
         /* 下面是 componentDidMount*/
        async function getData() {
            const rst = await GetDownloadList();
            setDownloadList(rst);
        }

        getData();
        /* 上面是 componentDidMount */
        return () => {
            /* 下面是 componentWillUnmount */
            /* 上面是 componentWillUnmount */
          };

    },[/* 第二個參數是用來限定當哪些變數被改變時useEffect要觸發 */])

    const downloadButtonOnClick = link => window.open(link, '_blank');

    const CreateTableContent = () => {

        const rst =
        downloadList.map((row) => (
            <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">
                    {row.description}
                </TableCell>
                <TableCell align="right">
                    {row.version}
                </TableCell>
                <TableCell align="right">
                    {row.releaseDate}
                </TableCell>
                <TableCell align="right">
                    {row.size}
                </TableCell>
                <TableCell align="right">
                    <Button classes={{outlined: classes.button}}
                            variant="outlined"
                            startIcon={<GetAppIcon/>}
                            onClick={() => downloadButtonOnClick(row.downloadLink)}>
                        Download
                    </Button>
                </TableCell>
            </TableRow>
        ))

        return rst;
    }

    const downloadListData = (downloadList === '')?
    (
        <div className="homepage-download">
            <LoadingSpinners/>
        </div>
    ):
    (
        <div className="homepage-download">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead className="tableHead" classes={{root: classes.tableHeadBGColor}}>
                        <TableRow >
                            <TableCell classes={{head: classes.tableHeadFontColor}}>Driver Name</TableCell>
                            <TableCell classes={{head: classes.tableHeadFontColor}} align="right">Description</TableCell>
                            <TableCell classes={{head: classes.tableHeadFontColor}} align="right">Version</TableCell>
                            <TableCell classes={{head: classes.tableHeadFontColor}} align="right">Release Date</TableCell>
                            <TableCell classes={{head: classes.tableHeadFontColor}} align="right">Package Size</TableCell>
                            <TableCell classes={{head: classes.tableHeadFontColor}} align="right">Download</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {CreateTableContent()}
                    </TableBody>

                </Table>
            </TableContainer>

        </div>
    );

    return (
        <div className="homepage">
            download Area
            {downloadListData}

            <hr/>

            <div className="homepage-info">
                info Area
            </div>
        </div>
    );
}
