import React from 'react';
import { useLabelDesigner } from './hooks/use-label-designer';
import { HeaderToolbar } from './components/header-toolbar';
import { ToolboxSidebar } from './components/toolbox-sidebar';
import { CanvasArea } from './components/canvas-area';
import { PropertySidebar } from './components/property-sidebar';
import { ContextMenu } from './components/context-menu';
import { PreviewModal } from './components/preview-modal';

export default function LabelDesigner() {
  const { state, func, refs } = useLabelDesigner();
  const hasLockedInSelection = state.template.elements.some((el) => state.selectedIds.includes(el.id) && el.locked);

  return (
    <div className="flex flex-col h-screen bg-slate-100 text-slate-800 select-none overflow-hidden font-sans">
      <HeaderToolbar
        canUndo={state.canUndo}
        canRedo={state.canRedo}
        onUndo={func.handleUndo}
        onRedo={func.handleRedo}
        widthMm={state.template.width_mm}
        heightMm={state.template.height_mm}
        autoHeight={state.template.auto_height}
        onUpdateDimensions={func.updateTemplateDimensions}
        zoom={state.zoom}
        onChangeZoom={func.setZoom}
        snapGrid={state.snapGrid}
        onChangeSnapGrid={func.setSnapGrid}
        fileInputRef={refs.fileInputRef}
        onUploadJSON={func.handleUploadJSON}
        onResetTemplate={func.handleResetTemplate}
        onDownloadJSON={func.handleDownloadJSON}
        onOpenPreview={() => func.setPreviewOpen(true)}
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
          selectedIds={state.selectedIds}
          editingTextId={state.editingTextId}
          scale={state.scale}
          zoom={state.zoom}
          canvasWidthPx={state.canvasWidthPx}
          canvasHeightPx={state.canvasHeightPx}
          canvasRef={refs.canvasRef}
          alignmentGuides={state.alignmentGuides}
          marquee={state.marquee}
          mouseMm={state.mouseMm}
          onSelect={func.selectElement}
          onPointerDown={func.handlePointerDown}
          onResizePointerDown={func.handleResizePointerDown}
          onMarqueeStart={func.handleMarqueeStart}
          onCanvasMouseMove={func.handleCanvasMouseMove}
          onCanvasMouseLeave={func.handleCanvasMouseLeave}
          onCanvasDragOver={func.handleCanvasDragOver}
          onCanvasDrop={func.handleCanvasDrop}
          onContextMenu={func.handleContextMenu}
          onWheel={func.handleCanvasWheel}
          onStartTextEdit={func.handleStartTextEdit}
          onChangeTextEdit={func.handleChangeTextEdit}
          onCommitTextEdit={func.handleCommitTextEdit}
          onCancelTextEdit={func.handleCancelTextEdit}
        />

        <PropertySidebar
          selectedElement={state.selectedElement}
          selectedCount={state.selectedIds.length}
          onUpdateSelectedElement={func.updateSelectedElement}
          onDeleteSelected={func.handleDeleteSelected}
          onToggleLock={func.handleToggleLockSelected}
          onDuplicate={func.handleDuplicateSelected}
        />
      </div>

      {state.contextMenu && (
        <ContextMenu
          x={state.contextMenu.x}
          y={state.contextMenu.y}
          selectedCount={state.selectedIds.length}
          hasLockedInSelection={hasLockedInSelection}
          onClose={func.closeContextMenu}
          onCopy={() => {
            func.handleCopySelected();
            func.closeContextMenu();
          }}
          onPaste={() => {
            func.handlePasteClipboard();
            func.closeContextMenu();
          }}
          onDuplicate={func.handleDuplicateSelected}
          onDelete={func.handleDeleteSelected}
          onToggleLock={func.handleToggleLockSelected}
          onBringFront={() => func.handleReorderSelected('front')}
          onSendBack={() => func.handleReorderSelected('back')}
          onAlignLeft={() => func.handleAlignSelected('left')}
          onAlignRight={() => func.handleAlignSelected('right')}
          onAlignTop={() => func.handleAlignSelected('top')}
          onAlignBottom={() => func.handleAlignSelected('bottom')}
        />
      )}

      <PreviewModal open={state.previewOpen} template={state.template} onClose={() => func.setPreviewOpen(false)} />
    </div>
  );
}
