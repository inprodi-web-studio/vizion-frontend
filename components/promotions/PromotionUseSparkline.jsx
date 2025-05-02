import { forwardRef, useImperativeHandle } from "react";
import { Sparklines, SparklinesCurve, SparklinesSpots } from "react-sparklines";
import { theme } from "antd";

const LinearGradientFill = ({stopColor}) => (
  <linearGradient id="sparkline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stopColor={stopColor} stopOpacity="1" />
    <stop offset="100%" stopColor={stopColor} stopOpacity="0" />
  </linearGradient>
);

const PromotionUseSparkline = forwardRef(({
    data = [],
    className,
}, ref) => {
    useImperativeHandle(ref, () => ({

    }));

    const { token } = theme.useToken();
    
    return (
        <div className={className} style={{ width: "100%", height: "100%"}}>
          <Sparklines margin={5} data={data} height={40}>
            <svg>
              <defs>
                <LinearGradientFill stopColor={token.colorPrimary} />
              </defs>
            </svg>
            <SparklinesCurve
              color={token.colorPrimary}
              style={{
                fill: "url(#sparkline-gradient)",
                strokeWidth: 2,
              }}
            />
            <SparklinesSpots size={2} spotColors={[token.colorPrimary, token.colorPrimary]} />
          </Sparklines>
        </div>
    );
});

PromotionUseSparkline.displayName = "PromotionUseSparkline";

export const promotionUseSparklineMeta = {
    name: "promotionUseSparkline",
    displayName: "Promotion Sparkline",
    props : {
        data : {
            type : "object",
            defaultValue : [],
        },
    },
    refActions : {

    },
    importPath: "inprodi-design-system",
    importName: "PromotionUseSparkline",
};

export function registerPromotionUseSparkline(
    loader,
    customPromotionUseSparklineMeta,
) {
    const doRegisterComponent = (...args) =>
        loader ? loader.registerComponent(...args) : registerComponent(...args);
    doRegisterComponent(PromotionUseSparkline, customPromotionUseSparklineMeta ?? promotionUseSparklineMeta);
};