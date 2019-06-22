import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import sizeMe from 'react-sizeme';

let lastGridWidth = 1200;

const GridWrapper = ({
 size,
 layout,
 onLayoutChange,
 children,
 onDragStop,
 onResize,
 onResizeStop,
 onWidthChange,
 className,
 isResizable,
 isDraggable,
}) => {
  const width = size.width > 0 ? size.width : lastGridWidth;

  if (width !== lastGridWidth) {
    lastGridWidth = width;
  }

  return (
    <ReactGridLayout
      width={lastGridWidth}
      className={className}
      isDraggable={isDraggable}
      isResizable={isResizable}
      measureBeforeMount={false}
      containerPadding={[0, 0]}
      useCSSTransforms={true}
      margin={[10, 10]}
      cols={24}
      rowHeight={30}
      layout={layout}
      onResize={onResize}
      onResizeStop={onResizeStop}
      onDragStop={onDragStop}
      onLayoutChange={onLayoutChange}
    >
      {children}
    </ReactGridLayout>
  );
};

export default sizeMe({ monitorWidth: true })(GridWrapper);