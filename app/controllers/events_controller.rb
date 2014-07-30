class EventsController < ApplicationController
  def index
    @events = Event.all

    respond_to do |format|
      format.html
      format.json  { render json: @events }
      format.js
    end
  end

  def create
  end

  def update
  end

  def destroy
  end

end
