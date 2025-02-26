// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget(props) {
  const container = useRef();

  console.log("SYMBOOOLLL", props, `NASDAQ:${props.symbol}`)

  useEffect(
    () => {
      // Clear existing content in the container
      while (container.current?.firstChild) {
        container.current?.removeChild(container.current.firstChild);
      }

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:${props.symbol}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
        container.current?.appendChild(script);

        // Cleanup function to remove the script when the component unmounts
        // return () => {
        //   container.current?.removeChild(script);
        // };
    },
    [props]
  );

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "75rem", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
  );
}

export default TradingViewWidget;
