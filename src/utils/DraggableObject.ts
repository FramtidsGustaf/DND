type ContentType = {
  [key: string]: string | number | { [key: string]: ContentType };
};

export class DraggableObject {
  id: string;
  content: ContentType;
  isLifted: boolean = false;

  constructor({ id, content }: { id: string; content: ContentType }) {
    this.id = id;
    this.content = content;
  }

  lift() {
    this.isLifted = true;
  }

  drop() {
    this.isLifted = false;
  }

  clone() {
    const newContent = structuredClone(this.content);
    return new DraggableObject({ id: this.id, content: newContent });
  }
}
