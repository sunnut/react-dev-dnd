import React, { Suspense, useEffect, useState } from 'react';
import { Card, Form, Input, Icon, Modal, Tooltip } from 'antd';
import { view as GridLayout } from '../../components/layout';
import { pluginMap, pluginInfo } from '../../plugins';
import styles from './dashboard.module.css';

const FormItem = Form.Item;

//================================================================
// 获取点击事件源
//================================================================
const getEventTarget = (e) => {
  let targetEle = e.target;

  if (targetEle.nodeName === 'svg') {
    targetEle = targetEle.parentNode;
  } else if (targetEle.nodeName === 'path') {
    targetEle = targetEle.parentNode.parentNode;
  }

  return targetEle;
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

//================================================================
// Dashboard组件
//================================================================
const OverviewComponent = (props) => {
  // 页面ID
  let pageName = props.match.params.id;
  let currentPanelId;
  const [visible, setVisible] = useState(false);
  const [panelList, setPanelList] = useState([]);

  useEffect(
    () => {
      setTimeout(() => {
        setPanelList([{
          id: 'b',
          title: '请求成功率',
          type: 'line-chart',
          sql: '123',
          gridPos: {x: 0, y: 0, w: 8, h: 8}
        }, {
          id: 'a',
          title: 'B2B每秒请求数',
          type: 'bar-chart',
          sql: '123',
          gridPos: {x: 8, y: 0, w: 8, h: 8}
        }, {
          id: 'c',
          title: '错误码',
          type: 'pie-chart',
          sql: '123',
          gridPos: {x: 16, y: 0, w: 8, h: 8}
        }]);
      }, 500)
    },
    [pageName]
  );

  let panelMap = {};

  //================================================================
  // 根据panel信息生成其排版位置信息
  //================================================================
  const buildLayout = function() {
    const layout = [];

    for (let panel of panelList) {
      let stringId = panel.id.toString();
      panelMap[stringId] = panel;

      if (!panel.gridPos) {
        continue;
      }

      let panelPos = {
        i: stringId,
        x: panel.gridPos.x,
        y: panel.gridPos.y,
        w: panel.gridPos.w,
        h: panel.gridPos.h,
      };

      layout.push(panelPos);
    }

    return layout;
  };

  //================================================================
  // 新增Panel
  //================================================================
  const addPanel = function(e) {
    e.preventDefault();
    let targetEle = getEventTarget(e);

    const panelType = targetEle.getAttribute('data-id');
    setPanelList([{
      id: '' + new Date().getTime(),
      title: 'New Chart',
      type: panelType,
      sql: '1232',
      gridPos: {x: 0, y: 0, w: 8, h: 8}
    }, ...panelList]);
    return false;
  };

  //================================================================
  // 移除Panel
  //================================================================
  const removePanel = function(e) {
    e.preventDefault();
    let targetEle = getEventTarget(e);
    const panelId = targetEle.getAttribute('data-id');
    setPanelList(panelList.filter(x => x.id !== panelId));
    return false;
  };

  //================================================================
  // 编辑Panel
  //================================================================
  const editPanel = function(e) {
    e.preventDefault();
    let targetEle = getEventTarget(e);
    currentPanelId = targetEle.getAttribute('data-id');
    setVisible(true);
    return false;
  };

  //================================================================
  // 提交编辑Panel
  //================================================================
  const editSubmit = function () {
    // null
  };

  //================================================================
  // 全屏或退出
  //================================================================
  const toggleFullScreen = function(e) {
    e.preventDefault();
    // let targetEle = getEventTarget(e);
    // const panelId = targetEle.getAttribute('data-id');
    return false;
  };

  //================================================================
  // Panel操作工具栏
  //================================================================
  const operateToolBar = (panelId) => {
    return (
      <div className={styles.toolbar}>
        <Tooltip placement="bottom" title="编辑">
          <Icon type="edit" data-id={panelId} onClick={editPanel} />
        </Tooltip>
        <Tooltip placement="bottom" title="全屏">
          <Icon type="fullscreen" data-id={panelId} onClick={toggleFullScreen} />
        </Tooltip>
        <Tooltip placement="bottom" title="导出">
          <Icon type="export" data-id={panelId} />
        </Tooltip>
        <Tooltip placement="bottom" title="移除">
          <Icon type="close" data-id={panelId} onClick={removePanel} />
        </Tooltip>
      </div>
    );
  };

  return (
    <>
      <div className={`ant-row-flex ${styles["toolbar-wrapper"]}`}>
        <div className="ant-col-24">
          <div className={styles.toolbar}>
            {
              pluginInfo.map((plugin) => (
                <Tooltip key={plugin.name + 'tip'} placement="bottom" title={plugin.title}>
                  <Icon key={plugin.name} data-id={plugin.name} type={plugin.icon}
                      onClick={addPanel} />
                </Tooltip>
              ))
            }
            &nbsp;<span style={{fontSize: '14px', fontStyle: 'italic'}}>(&lt;-- 点击添加组件，组件可拖拽 & 缩放)</span>
            <Tooltip placement="bottom" title="保存">
              <Icon style={{float: 'right'}} type="save" />
            </Tooltip>
          </div>
        </div>
      </div>
      {
        panelList.length > 0 && (
          <Suspense fallback={<div>loading</div>}>
            <GridLayout
              layout={buildLayout()}
              isResizable={true}
              isDraggable={true}
            >
              {
                panelList.map((panel) => {
                  // const PanelCmp = React.lazy(() => import('../../plugins/' + panel.type + '/view'));
                  const PanelCmp = pluginMap[panel.type];

                  return (
                    <Card
                      key={panel.id}
                      title={panel.title}
                      extra={operateToolBar(panel.id)}
                    >
                      <PanelCmp key={panel.id + '-panel'} sql={panel.sql}/>
                    </Card>
                  )
                })
              }
            </GridLayout>
          </Suspense>
        )
      }
      <Modal
        title="编辑"
        visible={visible}
        onOk={editSubmit}
        onCancel={() => setVisible(false)}
      >
        <Form>
          <FormItem {...formItemLayout}
                    label="名称">
            <Input/>
          </FormItem>
          <FormItem {...formItemLayout}
                    label="SQL">
            <Input/>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default OverviewComponent;