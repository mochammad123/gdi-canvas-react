import React from 'react';
import { useLabelDesigner } from './hooks/use-label-designer';
import { HeaderToolbar } from './components/header-toolbar';
import { ToolboxSidebar } from './components/toolbox-sidebar';
import { CanvasArea } from './components/canvas-area';
import { PropertySidebar } from './components/property-sidebar';

export default function LabelDesigner() {
  const { state, func, refs } = useLabelDesigner();

  return (
    <div className="flex flex-col h-screen bg-slate-100 text-slate-800 select-none overflow-hidden font-sans">
      <HeaderToolbar
        canUndo={state.canUndo}
        canRedo={state.canRedo}
        onUndo={func.handleUndo}
        onRedo={func.handleRedo}
        widthMm={state.template.width_mm}
        heightMm={state.template.height_mm}
        onUpdateDimensions={func.updateTemplateDimensions}
        zoom={state.zoom}
        onChangeZoom={func.setZoom}
        snapGrid={state.snapGrid}
        onChangeSnapGrid={func.setSnapGrid}
        fileInputRef={refs.fileInputRef}
        onUploadJSON={func.handleUploadJSON}
        onResetTemplate={func.handleResetTemplate}
        onDownloadJSON={func.handleDownloadJSON}
      />

      <div className="flex flex-1 overflow-hidden">
        <ToolboxSidebar
          onAddElement={func.handleAddElement}
          tags={state.tags}
          newTagInput={state.newTagInput}
          onChangeNewTagInput={func.setNewTagInput}
          onAddCustomTag={func.handleAddCustomTag}
          onDeleteCustomTag={func.handleDeleteCustomTag}
        />

        <CanvasArea
          template={state.template}
          selectedId={state.selectedId}
          scale={state.scale}
          zoom={state.zoom}
          canvasWidthPx={state.canvasWidthPx}
          canvasHeightPx={state.canvasHeightPx}
          canvasRef={refs.canvasRef}
          onSelect={func.setSelectedId}
          onPointerDown={func.handlePointerDown}
        />

        <PropertySidebar
          selectedElement={state.selectedElement}
          onUpdateSelectedElement={func.updateSelectedElement}
          onDeleteSelected={func.handleDeleteSelected}
        />
      </div>
    </div>
  );
}
