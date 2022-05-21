import React, { useState, useEffect } from "react";

import ReactECharts from "echarts-for-react";

import {
  transGweiToEth,
  timeToYYYYMMDD,
  walletAddrShortcut,
} from "./service/parser";
import { getTradeRecord, getWalletFound } from "./service/etherScan";
import { sortBy } from "./service/filter";
import { fetchAPI } from "./service/fetch";

export default function Result(props) {
  const [tradeData, setTData] = useState([]);
  const [found, setFound] = useState(0);
  const [order, setOrede] = useState("acc");
  const [orderTarget, setOrderTarget] = useState("timeStamp");
  const [pieData, setPieData] = useState({
    title: {
      text: "Wallet Assets",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });

  const [network, setNetwork] = useState({
    title: {
      text: "Trade Connection",
      left: "center",
    },
    tooltip: {},
    legend: [
      {
        show: false,
        data: []
      },
    ],
    series: [
      {
        type: "graph",
        layout: "force",
        draggable: true,
        animation: false,
        roam: true,
        label: {
          show: true,
          position: "right",
          formatter: "{b}",
        },
        labelLayout: {
          hideOverlap: true,
        },
        scaleLimit: {
          min: 2,
          max: 5,
        },
        lineStyle: {
          color: "source",
          // curveness: 0.3,
        },
        force: {
          edgeLength: 30,
          repulsion: 20,
          gravity: 0.1,
        },
        data: [],
        categories: [],
        edges: [],
      },
    ],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await getTradeRecord(props.wallet);
    let { result } = await getWalletFound(props.wallet);

    setTData(data.result);
    setFound(transGweiToEth(result));

    setPieChart(result)
    setNetworkChart(data.result)
  };

  const setPieChart = (result) =>{
    let data = [{ value: transGweiToEth(result), name: "ETH" }]
    setPieData(preData=>({
      ...preData,
      series:{
        ...preData.series,
        data:data
      }
    }))
  }

  const setNetworkChart = (data) => {
    let edges = build_edges(data)
    let unRepeatNode = buildUnrepeatNode(data)

    setNetwork(preData=>({
      ...preData,
      legend:{
        ...preData.legend[0],
        data: unRepeatNode.map(item=>{return {name:item}})
      },
      series:{
        ...preData.series,
        data:build_nodes(unRepeatNode),
        categories: build_categoties(unRepeatNode),
        edges:edges,
      }
    }))
  }

  const buildUnrepeatNode = (data) =>{
    return [...data.reduce((acc,curr)=> new Set([...acc,...[curr.from,curr.to]]),[])]
  }

  const build_nodes = (cates) =>{
    return cates.map(addr=>{return{
      id: addr,
      name: addr === props.wallet ? 'your wallet' : walletAddrShortcut(addr),
      symbolSize: 10,
      category:addr,
    }})
  }

  const build_edges = (data) =>{
    return data.map(item=>{
      let gasFeeGwei = (item.gasUsed * item.gasPrice).toString();
      return {
        source:item.from,
        target:item.to,
        date:timeToYYYYMMDD(item.timeStamp),
        value:transGweiToEth(item.value),
        fee:transGweiToEth(gasFeeGwei)
      }})
  }

  const build_categoties = (data) =>{
    return data.map(item=>{return{name:item}})
  }


  const networkEvent = {
    onclick : (params) => {console.log(params)}
  }


  return (
    <>
      <div className="text-4xl mb-8">Result</div>
      <div className="flex flex-col">
        <div className="flex flex-row h-[300px]">
          <div className="w-1/2">
            <ReactECharts option={pieData} />
          </div>

          <div className="w-1/2">
            <ReactECharts option={network}/>
          </div>
        </div>
        <table className="border-collapse rounded-xl bg-white overflow-hidden relative">
          <thead className="h-[60px] bg-primary">
            <tr className="text-left text-lg text-white">
              <th className="pl-10" >time</th>
              <th className="pl-2">from</th>
              <th className="pl-2">to</th>
              <th className="pl-2">value</th>
              <th className="pr-14">gas fee</th>
            </tr>
          </thead>
          <tbody>
            {sortBy(tradeData, orderTarget, order).map((row, idx) => {
              let gasFeeGwei = (row.gasUsed * row.gasPrice).toString();
              return (
                <tr className="text-base h-14 leading-tight text-left " key={idx}>
                  <td className="pl-10">{timeToYYYYMMDD(row.timeStamp)}</td>
                  <td className="pl-2">{walletAddrShortcut(row.from)}</td>
                  <td className="pl-2">{walletAddrShortcut(row.to)}</td>
                  <td className="pl-2">{transGweiToEth(row.value)} Eth</td>
                  <td className="pr-14 text-xs">{transGweiToEth(gasFeeGwei)} Eth</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
